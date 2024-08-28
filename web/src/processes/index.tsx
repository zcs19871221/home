import { useIntl, FormattedMessage } from 'react-intl';
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
import { Process, processesApiBase } from '../projects/types.ts';
import { LogInfo, ProcessesStatus } from './types.ts';
import VscodeOpener from '../common/VscodeOpener.tsx';
import { i18n } from '../i18n/index.tsx';

const operator = (type: 'start' | 'stop' | 'restart', processesId: number) =>
  jsonFetcher(`${processesApiBase}/${processesId}/${type}`, 'PUT').then(() => {
    message.success(
      i18n.intl.formatMessage(
        {
          id: 'key0007',
          defaultMessage: '{v1}指令已发送',
        },
        { v1: type },
      ),
    );
  });

const Status = ({
  logInfo,
  process,
  processesId,
  processesName,
  setProcessesId,
  refetchServerInfo,
  onClick,
  refetchLog,
}: {
  logInfo?: LogInfo;
  process?: Process;
  processesId: number;
  setProcessesId: (id: number) => void;
  refetchServerInfo: () => void;
  processesName?: string;
  onClick: () => void;
  refetchLog: () => void;
}) => {
  const intl = useIntl();

  let text = '';
  let color: TagProps['color'] = 'processing';

  if (logInfo?.status === undefined) {
    text = intl.formatMessage({
      id: 'key0008',
      defaultMessage: '未开启',
    });
    color = 'grey';
  } else {
    const { status } = logInfo;

    switch (status) {
      case ProcessesStatus.CLOSED:
        text = intl.formatMessage({
          id: 'key0009',
          defaultMessage: '已关闭',
        });
        color = 'grey';
        break;
      case ProcessesStatus.ERROR:
        text = intl.formatMessage({
          id: 'key0010',
          defaultMessage: '错误',
        });
        color = 'error';
        break;
      case ProcessesStatus.COMPILING:
        text = intl.formatMessage({
          id: 'key0011',
          defaultMessage: '编译中..',
        });
        color = 'processing';
        break;
      case ProcessesStatus.SUCCESS:
        text = intl.formatMessage({
          id: 'key0012',
          defaultMessage: '成功',
        });
        color = 'success';
        break;
      case ProcessesStatus.UNKNOWN:
        text = intl.formatMessage({
          id: 'key0013',
          defaultMessage: '未知',
        });
        color = 'warning';
        break;
      default: {
        const error: never = status;
        console.error(error);
      }
    }
  }

  return (
    <div>
      <div className="flex space-x-2 items-center">
        <div>{processesName ?? ''}</div>
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
        <Tooltip
          title={intl.formatMessage({
            id: 'key0014',
            defaultMessage: '启动服务',
          })}
        >
          <Button
            type="text"
            disabled={
              logInfo?.status !== ProcessesStatus.CLOSED &&
              logInfo?.status !== undefined
            }
            onClick={() => {
              operator('start', processesId).then(() => refetchServerInfo());
            }}
            className="text-green-600 cursor-pointer"
          >
            <CaretRightOutlined />
          </Button>
        </Tooltip>
        <Tooltip
          title={intl.formatMessage({
            id: 'key0015',
            defaultMessage: '关闭服务',
          })}
        >
          <Button
            type="text"
            disabled={
              logInfo?.status === ProcessesStatus.CLOSED ||
              logInfo?.status === undefined
            }
            onClick={() => {
              operator('stop', processesId).then(() => refetchServerInfo());
            }}
            className="text-red-500 cursor-pointer"
          >
            <BorderOutlined />
          </Button>
        </Tooltip>
        <Tooltip
          title={intl.formatMessage({
            id: 'key0016',
            defaultMessage: '重启服务',
          })}
        >
          <Button
            type="text"
            onClick={() => {
              operator('restart', processesId).then(() => refetchServerInfo());
            }}
            disabled={
              logInfo?.status === ProcessesStatus.CLOSED ||
              logInfo?.status === undefined
            }
            className="text-green-600 cursor-pointer"
          >
            <RedoOutlined />
          </Button>
        </Tooltip>
        <Tooltip
          title={intl.formatMessage({
            id: 'key0017',
            defaultMessage: '查看日志',
          })}
        >
          <Button
            type="text"
            onClick={() => {
              setProcessesId(processesId);
            }}
          >
            <FileOutlined />
          </Button>
        </Tooltip>
        <Tooltip
          title={intl.formatMessage({
            id: 'key0018',
            defaultMessage: '清除日志',
          })}
        >
          <Button
            type="text"
            onClick={() => {
              jsonFetcher(
                `${processesApiBase}/${processesId}/logs`,
                'DELETE',
              ).then(() => refetchLog());
            }}
          >
            <ClearOutlined />
          </Button>
        </Tooltip>
        <VscodeOpener command={process?.project.path} />
      </div>
    </div>
  );
};

export default function ProcessesComponent() {
  const intl = useIntl();

  const { data, isLoading } = useAppSwr<Process[]>(processesApiBase);

  const { data: processesInfo, mutate: refetchServerInfo } = useAppSwr<{
    [processesId: number]: LogInfo;
  }>(`${processesApiBase}/runningInfos`, {
    refreshInterval: 2000,
  });

  const [processesId, setProcessesId] = useState<number | null>(null);

  const { data: log, mutate: refetchLog } = useAppSwr<string>(
    processesId !== null
      ? `${processesApiBase}/${processesId}/logs`
      : undefined,
    processesId !== null
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
                  `/system/run?command=${encodeURIComponent(
                    `code ${locate}:${row}:${col}`,
                  )}`,
                  'GET',
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
    if (processesId == null) {
      setProcessesId(id);
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
        <h2 className="mr-auto">
          <FormattedMessage id="key0019" defaultMessage="服务管理" />
        </h2>
      </div>
      <Table
        rowKey="id"
        pagination={false}
        dataSource={data}
        loading={isLoading}
        columns={[
          {
            title: intl.formatMessage({
              id: 'key0020',
              defaultMessage: '描述',
            }),
            dataIndex: 'description',
            render: (_val, record: Process) => (
              <div>
                <div>
                  <Status
                    logInfo={processesInfo?.[record.id]}
                    processesId={record.id}
                    process={record}
                    processesName={record.description}
                    onClick={() => handleClickStatus(record.id)}
                    setProcessesId={setProcessesId}
                    refetchServerInfo={refetchServerInfo}
                    refetchLog={refetchLog}
                  />
                </div>
              </div>
            ),
          },
          {
            title: intl.formatMessage({
              id: 'key0021',
              defaultMessage: '命令',
            }),
            dataIndex: 'command',
          },
          {
            title: intl.formatMessage({
              id: 'key0022',
              defaultMessage: '端口',
            }),
            dataIndex: 'port',
          },
          {
            dataIndex: ['project', 'path'],
            title: intl.formatMessage({
              id: 'key0023',
              defaultMessage: '地址',
            }),
          },
        ]}
      />
      <Modal
        open={processesId !== null && processesInfo !== undefined}
        onCancel={() => setProcessesId(null)}
        footer={null}
        title={
          <div className="space-x-5 flex align-middle">
            {processesId !== null && (
              <Status
                logInfo={processesInfo?.[processesId]}
                processesId={processesId}
                refetchLog={refetchLog}
                process={data?.find((d) => d.id === processesId)}
                processesName={
                  data?.find((d) => d.id === processesId)?.description
                }
                onClick={() => handleClickStatus(processesId)}
                setProcessesId={setProcessesId}
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
