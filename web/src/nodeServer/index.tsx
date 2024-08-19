import { Button, Modal, Table, Tag, TagProps, Tooltip, message } from 'antd';

import {
  BorderOutlined,
  CaretRightOutlined,
  ClearOutlined,
  FileOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { ReactNode, useMemo, useRef, useState } from 'react';
import { css } from '@linaria/core';

import { bufferFetcher, jsonFetcher, useAppSwr } from '../common/fetcher.tsx';
import { NodeServer, nodeServerApiBase } from '../npmProject/types.ts';
import { LogInfo, NodeServerStatus } from './types.ts';

const operator = (type: 'start' | 'stop' | 'restart', nodeServerId: number) =>
  jsonFetcher(`${nodeServerApiBase}/${type}/${nodeServerId}`, 'PUT').then(
    () => {
      message.success(`${type}指令已发送`);
    },
  );

const Status = ({
  logInfo,
  nodeServerId,
  nodeServerName,
  setNodeServerId,
  refetchServerInfo,
  onClick,
  refetchLog,
}: {
  logInfo?: LogInfo;
  nodeServerId: number;
  setNodeServerId: (id: number) => void;
  refetchServerInfo: () => void;
  nodeServerName?: string;
  onClick: () => void;
  refetchLog: () => void;
}) => {
  let text = '';
  let color: TagProps['color'] = 'processing';

  if (logInfo?.status === undefined) {
    text = '未开启';
    color = 'grey';
  } else {
    const { status } = logInfo;

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
    <div>
      <div className="flex space-x-2 items-center">
        <div>{nodeServerName ?? ''}</div>
        <Tag
          bordered={false}
          color={color}
          className="flex align-middle cursor-pointer"
          onClick={onClick}
        >
          {text}
        </Tag>
      </div>
      <div className=" text-grey mt-2">
        <Tooltip title="启动服务">
          <Button
            type="text"
            disabled={
              logInfo?.status !== NodeServerStatus.CLOSED &&
              logInfo?.status !== undefined
            }
            onClick={() => {
              operator('start', nodeServerId).then(() => refetchServerInfo());
            }}
            className="text-green-600 cursor-pointer"
          >
            <CaretRightOutlined />
          </Button>
        </Tooltip>
        <Tooltip title="关闭服务">
          <Button
            type="text"
            disabled={
              logInfo?.status === NodeServerStatus.CLOSED ||
              logInfo?.status === undefined
            }
            onClick={() => {
              operator('stop', nodeServerId).then(() => refetchServerInfo());
            }}
            className="text-red-500 cursor-pointer"
          >
            <BorderOutlined />
          </Button>
        </Tooltip>
        <Tooltip title="重启服务">
          <Button
            type="text"
            onClick={() => {
              operator('restart', nodeServerId).then(() => refetchServerInfo());
            }}
            disabled={
              logInfo?.status === NodeServerStatus.CLOSED ||
              logInfo?.status === undefined
            }
            className="text-green-600 cursor-pointer"
          >
            <RedoOutlined />
          </Button>
        </Tooltip>
        <Tooltip title="查看日志">
          <Button
            type="text"
            onClick={() => {
              setNodeServerId(nodeServerId);
            }}
          >
            <FileOutlined />
          </Button>
        </Tooltip>
        <Tooltip title="清除日志">
          <Button
            type="text"
            onClick={() => {
              jsonFetcher(
                `${nodeServerApiBase}/logs/${nodeServerId}`,
                'DELETE',
              ).then(() => refetchLog());
            }}
          >
            <ClearOutlined />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default function NodeServerComponent() {
  const { data, isLoading } = useAppSwr<NodeServer[]>(nodeServerApiBase);

  const { data: nodeServerInfo, mutate: refetchServerInfo } = useAppSwr<{
    [nodeServerId: number]: LogInfo;
  }>(`${nodeServerApiBase}/runningInfos`, {
    refreshInterval: 2000,
  });

  const [nodeServerId, setNodeServerId] = useState<number | null>(null);

  const { data: log, mutate: refetchLog } = useAppSwr<string>(
    nodeServerId !== null
      ? `${nodeServerApiBase}/logs/${nodeServerId}`
      : undefined,
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
            <h3 id={idKey} className="text-red-500" key={idKey}>
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

  const errorAnchorIndexRef = useRef(0);

  const handleClickStatus = (id: number) => {
    if (nodeServerId == null) {
      setNodeServerId(id);
    }
    if (!errorAnchorIds || errorAnchorIds.length === 0) {
      return;
    }
    window.location.href = `#${errorAnchorIds?.[errorAnchorIndexRef.current]}`;
    errorAnchorIndexRef.current =
      (errorAnchorIndexRef.current + 1) % errorAnchorIds.length;
  };

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
            render: (_val, record: NodeServer) => (
              <div>
                <div>
                  <Status
                    logInfo={nodeServerInfo?.[record.id]}
                    nodeServerId={record.id}
                    nodeServerName={record.description}
                    onClick={() => handleClickStatus(record.id)}
                    setNodeServerId={setNodeServerId}
                    refetchServerInfo={refetchServerInfo}
                    refetchLog={refetchLog}
                  />
                </div>
              </div>
            ),
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
            {nodeServerId !== null && (
              <Status
                logInfo={nodeServerInfo?.[nodeServerId]}
                nodeServerId={nodeServerId}
                refetchLog={refetchLog}
                nodeServerName={
                  data?.find((d) => d.id === nodeServerId)?.description
                }
                onClick={() => handleClickStatus(nodeServerId)}
                setNodeServerId={setNodeServerId}
                refetchServerInfo={refetchServerInfo}
              />
            )}
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
        <pre>{html}</pre>
      </Modal>
    </div>
  );
}
