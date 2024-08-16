import { Button, Modal, Table, Tag, TagProps, Tooltip, message } from 'antd';

import {
  BorderOutlined,
  CaretRightOutlined,
  FileOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { ReactNode, useMemo, useRef, useState } from 'react';
import { css } from '@linaria/core';

import { bufferFetcher, jsonFetcher, useAppSwr } from '../common/fetcher.tsx';
import { NodeServer, nodeServerApiBase } from '../npmProject/types.ts';
import { LogInfo, NodeServerStatus } from './types.ts';

const Status = ({
  nodeServerInfo,
  nodeServerId,
  nodeServerName,
  errorAnchorIds,
}: {
  nodeServerInfo?: {
    [nodeServerId: number]: LogInfo;
  };
  nodeServerId?: number | null;
  nodeServerName?: string;
  errorAnchorIds?: string[];
}) => {
  let text = '';
  let color: TagProps['color'] = 'processing';

  const errorAnchorIndexRef = useRef(0);

  if (
    !nodeServerInfo ||
    nodeServerId === undefined ||
    nodeServerId === null ||
    nodeServerInfo[nodeServerId]?.status === undefined
  ) {
    text = '未开启';
    color = 'grey';
  } else {
    const status = nodeServerInfo[nodeServerId]?.status;

    switch (status) {
      case NodeServerStatus.CLOSED:
        text = '已关闭';
        color = 'grey';
        break;
      case NodeServerStatus.ERROR:
        text = '错误';
        color = 'error';
        break;
      case NodeServerStatus.COMPILING:
        text = '编译中..';
        color = 'processing';
        break;
      case NodeServerStatus.SUCCESS:
        text = '成功';
        color = 'success';
        break;
      case NodeServerStatus.UNKNOWN:
        text = '未知';
        color = 'warning';
        break;
      default: {
        const error: never = status;
        throw new Error(error);
      }
    }
  }

  return (
    <div className="flex align-middle space-x-2 mb-2">
      <div>{nodeServerName ?? ''}</div>
      <Tag
        bordered={false}
        color={color}
        style={
          errorAnchorIds?.length && errorAnchorIds?.length > 0
            ? {
                cursor: 'pointer',
              }
            : {}
        }
        className="flex align-middle"
        onClick={() => {
          if (!errorAnchorIds) {
            return;
          }
          window.location.href = `#${errorAnchorIds?.[errorAnchorIndexRef.current]}`;
          errorAnchorIndexRef.current =
            (errorAnchorIndexRef.current + 1) % errorAnchorIds.length;
        }}
      >
        {text}
      </Tag>
    </div>
  );
};

const operator = (type: 'start' | 'stop' | 'restart', nodeServerId: number) =>
  jsonFetcher(`${nodeServerApiBase}/${type}/${nodeServerId}`, 'PUT').then(
    () => {
      message.success(`${type}指令已发送`);
    },
  );

export default function NodeServerComponent() {
  const { data, isLoading } = useAppSwr<NodeServer[]>(nodeServerApiBase);

  const { data: nodeServerInfo, mutate: refetchServerInfo } = useAppSwr<{
    [nodeServerId: number]: LogInfo;
  }>(`${nodeServerApiBase}/runningInfos`, {
    refreshInterval: 2000,
  });

  const [nodeServerId, setNodeServerId] = useState<number | null>(null);

  const { data: log, mutate: refetchLog } = useAppSwr<string>(
    nodeServerId !== null ? `/logs/${nodeServerId}` : undefined,
    nodeServerId !== null
      ? {
          fetcher: bufferFetcher,
          refreshInterval: 2000,
          revalidateIfStale: true,
          revalidateOnFocus: true,
          revalidateOnMount: true,
          revalidateOnReconnect: true,
        }
      : {},
  );

  const [html, errorAnchorIds] = useMemo(() => {
    const ids: string[] = [];
    let id = 1;
    const htmlParts: ReactNode[] = [];
    let index = 0;

    log?.replace(
      /(?:ERROR in ([^(]+)\((\d+),(\d+)\))|(\berror\b)/gi,
      (_match, locate, row, col, errorText, offset) => {
        htmlParts.push(log.slice(index, offset));
        index = offset + _match.length;
        const idKey = `error${id++}`;
        ids.push(idKey);
        if (errorText) {
          htmlParts.push(
            <h3 id={idKey} className="text-red-500">
              {errorText}
            </h3>,
          );
          return _match;
        }
        htmlParts.push(
          <h3 id={idKey} className="text-red-500">
            <Button
              type="link"
              onClick={() => {
                jsonFetcher(
                  '/api/npmProjects/vscodeError',
                  'PUT',
                  encodeURIComponent(`${locate}:${row}:${col}`),
                );
              }}
              target="_blank"
            >
              {_match}
            </Button>
          </h3>,
        );
        return _match;
      },
    );
    if (log) {
      htmlParts.push(log.slice(index));
    }
    return [htmlParts, ids];
  }, [log]);

  return (
    <div>
      <div className="flex justify-center items-center h-8">
        <h2 className="mr-auto">服务管理</h2>
      </div>
      <Table
        rowKey="id"
        pagination={false}
        dataSource={data}
        loading={isLoading}
        columns={[
          {
            title: '描述',
            dataIndex: 'description',
            render: (_val, record: NodeServer) => {
              const status = nodeServerId
                ? nodeServerInfo?.[nodeServerId]?.status
                : undefined;

              return (
                <div>
                  <div>
                    <Status
                      nodeServerInfo={nodeServerInfo}
                      nodeServerId={record.id}
                      nodeServerName={record.description}
                    />
                  </div>
                  <div className="space-x-5 text-grey">
                    <CaretRightOutlined
                      className={
                        status === NodeServerStatus.CLOSED ||
                        status === undefined
                          ? 'text-green-600 cursor-pointer'
                          : 'text-gray-400 opacity-50 !cursor-not-allowed'
                      }
                      onClick={() => {
                        operator('start', record.id as number).then(() =>
                          refetchServerInfo(),
                        );
                      }}
                    />
                    <Tooltip title="关闭服务">
                      <BorderOutlined
                        className={
                          status === NodeServerStatus.CLOSED ||
                          status === undefined
                            ? 'text-gray-400 opacity-50 !cursor-not-allowed'
                            : 'text-red-500 cursor-pointer'
                        }
                        onClick={() => {
                          operator('stop', record.id as number).then(() =>
                            refetchServerInfo(),
                          );
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="重启服务">
                      <RedoOutlined
                        className={
                          status === NodeServerStatus.CLOSED ||
                          status === undefined
                            ? 'text-gray-400 opacity-50 !cursor-not-allowed'
                            : 'text-green-600 cursor-pointer'
                        }
                        onClick={() => {
                          operator('restart', record.id as number).then(() =>
                            refetchServerInfo(),
                          );
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="查看日志">
                      <FileOutlined
                        className="cursor-pointer"
                        onClick={() => {
                          setNodeServerId(record.id);
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
              );
            },
          },
          { title: '命令', dataIndex: 'command' },
          {
            title: '端口',
            dataIndex: 'port',
          },
          {
            dataIndex: ['npmProject', 'path'],
            title: '地址',
          },
        ]}
      />
      <Modal
        open={nodeServerId !== null && nodeServerInfo !== undefined}
        onCancel={() => setNodeServerId(null)}
        footer={null}
        title={
          <div className="space-x-5 flex align-middle">
            <Status
              nodeServerInfo={nodeServerInfo}
              nodeServerId={nodeServerId}
              nodeServerName={
                data?.find((d) => d.id === nodeServerId)?.description
              }
              errorAnchorIds={errorAnchorIds}
            />

            <Button
              type="link"
              onClick={() =>
                jsonFetcher(
                  `/api/nodeServers/clearLog/${nodeServerId}`,
                  'GET',
                ).then(() => refetchLog())
              }
            >
              清除日志
            </Button>
          </div>
        }
        width="80vw"
        classNames={{
          body: css`
            height: 80vh;
            overflow-y: scroll;
          `,
        }}
        centered
      >
        <div
          className={css`
            white-space: pre-line;
          `}
        >
          {html}
        </div>
      </Modal>
    </div>
  );
}
