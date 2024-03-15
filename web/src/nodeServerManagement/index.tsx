/* eslint-disable no-control-regex */
import { css } from '@linaria/core';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Segmented,
  Space,
  Table,
  Tag,
  TagProps,
  Tooltip,
  message,
} from 'antd';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import useSWR from 'swr';
import { DisabledContextProvider } from 'antd/es/config-provider/DisabledContext';
import { InnerForm } from './InnerForm.tsx';
import {
  NodeServerState,
  Project,
  NodeServerResponse,
  LogInfo,
  NodeServerStatus,
  NodeServerPayload,
} from './types.ts';
import useNpmProjects, { base } from './useNpmProjects.ts';
import { DebouncedInput } from './useDebouncedValue.tsx';
import { jsonFetcher, bufferFetcher } from './fetcher.tsx';

const errorAnchorCls = css`
  color: red;
  display: inline;
`;

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
    <>
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
    </>
  );
};

function NodeServerManagement() {
  const { data: npmProjects, mutate: refetchNpmProjects } = useNpmProjects();

  const [nodeServerStates, setNodeServerStates] = useState<NodeServerState[]>(
    [],
  );

  const {
    nodeIdMapNodeServerResponse,
    rootNodeServerResponses,
    rootNodeServerStates,
    nodeIdMapNodeServerState,
  } = useMemo(() => {
    const nIdMapNodeServerState: Record<number, NodeServerState> = {};
    const idMapNodeServerResponse: Record<number, NodeServerResponse> = {};
    const rNodeServerStates: NodeServerState[] = [];
    const rootResponses: NodeServerResponse[] = [];

    npmProjects?.forEach((npmProject) => {
      npmProject.nodeServers.sort((a, b) => a.id - b.id);
      npmProject.nodeServers.forEach((nodeResponse) => {
        const nodeServerResponse = { ...nodeResponse };
        nodeServerResponse.portConfigFileRelativePath = decodeURIComponent(
          nodeServerResponse.portConfigFileRelativePath,
        );
        nodeServerResponse.portReg = decodeURIComponent(
          nodeServerResponse.portReg,
        );
        const nodeServerState: NodeServerState = {
          ...nodeServerResponse,
          postServers: [],
        };
        nIdMapNodeServerState[nodeServerResponse.id] = nodeServerState;
        idMapNodeServerResponse[nodeServerResponse.id] = nodeServerResponse;
        if (!nodeServerResponse.prevServerId) {
          rootResponses.push(nodeServerResponse);
          rNodeServerStates.push(nodeServerState);
        }
      });
    });

    Object.values(nIdMapNodeServerState).forEach((nodeState) => {
      const nodeServerState = nodeState;
      nodeServerState.prevServer = nodeServerState.prevServerId
        ? nIdMapNodeServerState[nodeServerState.prevServerId]
        : undefined;
      nodeServerState.postServers =
        nodeServerState.postServerIds?.map(
          (postServerId) => nIdMapNodeServerState[postServerId],
        ) ?? [];
    });

    // setNodeServerStates(rNodeServerStates);

    return {
      rootNodeServerResponses: rootResponses,
      rootNodeServerStates: rNodeServerStates,
      nodeIdMapNodeServerResponse: idMapNodeServerResponse,
      nodeIdMapNodeServerState: nIdMapNodeServerState,
    };
  }, [npmProjects]);

  const [currentNodeServer, setCurrentNodeServer] = useState<number | null>(
    null,
  );

  const [groupByNpmProject, setGroupByNpmProject] = useState(false);

  const { data: log, mutate: refetchLog } = useSWR(
    currentNodeServer
      ? `${base}/api/nodeServers/logs/${currentNodeServer}`
      : undefined,
    bufferFetcher,
    {
      ...(!currentNodeServer !== null && { refreshInterval: 2000 }),
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    },
  );

  const operator = (type: 'start' | 'stop' | 'restart', nodeServerId: number) =>
    jsonFetcher(`/api/nodeServers/${type}/${nodeServerId}`, 'PUT').then(() => {
      message.success(`${type}指令已发送`);
    });

  const { data: nodeServerInfo, mutate: refetchServerInfo } = useSWR<{
    [nodeServerId: number]: LogInfo;
  }>(`${base}/api/nodeServers/runningInfos`, {
    ...(!groupByNpmProject && { refreshInterval: 2000 }),
  });

  useEffect(() => {
    refetchServerInfo();
  }, [refetchServerInfo]);

  const [modifyNodeServerType, setModifyNodeServerType] = useState<
    '批量添加修改' | '添加服务' | '编辑' | null
  >(null);

  const nodeServerColumn = [
    {
      title: '名称',
      dataIndex: 'name',
      render: (_value: unknown, record: NodeServerResponse) => (
        <Space
          className={css`
            display: flex;
            align-items: center;
          `}
        >
          <Status
            nodeServerInfo={nodeServerInfo}
            nodeServerId={record.id}
            nodeServerName={record.name}
          />
        </Space>
      ),
    },

    {
      title: '命令',
      dataIndex: 'command',
    },
    {
      title: '地址',
      render: (_v: unknown, record: NodeServerResponse) => {
        const path = npmProjects?.find(
          (n) => n.id === record.npmProjectId,
        )?.path;
        if (record.errorField === 'PROJECT_PATH') {
          return (
            <Tooltip title={record.errorMsg}>
              <span
                className={css`
                  color: red;
                `}
              >
                {path}
              </span>
            </Tooltip>
          );
        }
        return path;
      },
    },
    {
      title: '端口',
      dataIndex: 'port',
      render: (port: string, record: NodeServerResponse) => {
        if (record.errorMsg) {
          return (
            <Tooltip title={record.errorMsg}>
              <span
                className={css`
                  color: red;
                `}
              >
                {record.errorMsg}
              </span>
            </Tooltip>
          );
        }
        const hasDuplicatedPort = Object.values(
          nodeIdMapNodeServerResponse,
        ).find((n) => n.id !== record.id && n.port === port);

        return (
          <DebouncedInput
            value={port}
            style={
              hasDuplicatedPort
                ? {
                    color: 'red',
                  }
                : {}
            }
            onChange={(text: string) => {
              if (String(text) === String(port)) {
                return;
              }
              jsonFetcher(
                `/api/nodeServers/changePort/${record.id}/${text}`,
                'PUT',
              ).then(refetchNpmProjects);
            }}
          />
        );
      },
    },
    {
      title: '操作',
      render: (_: unknown, record: NodeServerResponse) => {
        const info = nodeServerInfo ? nodeServerInfo[record.id] : null;

        return (
          <Space>
            {groupByNpmProject && (
              <Button
                type="primary"
                onClick={() => {
                  setNodeServerStates([
                    { ...nodeIdMapNodeServerState[record.id] },
                  ]);
                  setModifyNodeServerType('编辑');
                }}
              >
                编辑
              </Button>
            )}

            {groupByNpmProject && (
              <Popconfirm
                title="删除服务"
                description="是否要删除服务"
                onConfirm={() => {
                  jsonFetcher(`/api/nodeServers/${record.id}`, 'DELETE').then(
                    () => {
                      message.success('删除成功');
                      refetchNpmProjects();
                    },
                  );
                }}
              >
                <Button type="link">删除</Button>
              </Popconfirm>
            )}
            {!groupByNpmProject && (
              <DisabledContextProvider disabled={!!record.errorMsg}>
                <Button
                  type="link"
                  onClick={() =>
                    jsonFetcher(
                      `/api/npmProjects/vscode/${record.npmProjectId}`,
                      'GET',
                    )
                  }
                >
                  vscode
                </Button>
                <Button
                  type="link"
                  onClick={() =>
                    operator('start', record.id as number).then(() =>
                      refetchServerInfo(),
                    )
                  }
                >
                  启动
                </Button>
                <Button
                  type="link"
                  onClick={() => {
                    setCurrentNodeServer(record.id ?? null);
                  }}
                  disabled={!info}
                >
                  日志
                </Button>
                <Button
                  type="link"
                  onClick={() =>
                    operator('restart', record.id).then(() =>
                      refetchServerInfo(),
                    )
                  }
                >
                  重启
                </Button>

                <Button type="link" onClick={() => operator('stop', record.id)}>
                  关闭
                </Button>
              </DisabledContextProvider>
            )}
          </Space>
        );
      },
    },
  ];

  const expandedRowRender = (record: Project) => (
    <Table
      pagination={false}
      dataSource={
        record.nodeServers?.map((nodeServer) => {
          const newNodeServer = { ...nodeServer, key: nodeServer.id };
          return newNodeServer;
        }) ?? []
      }
      rowKey="id"
      columns={nodeServerColumn}
    />
  );

  function Nested(nodeServerResponse: NodeServerResponse) {
    const { postServerIds } = nodeServerResponse;
    if (!postServerIds || postServerIds.length === 0) {
      return null;
    }
    const handledNodeServers = postServerIds.map((id) => ({
      ...nodeIdMapNodeServerResponse[id],
      key: id,
    }));

    return (
      <Table
        pagination={false}
        dataSource={handledNodeServers}
        columns={nodeServerColumn}
        expandable={{
          expandedRowRender: Nested,
          defaultExpandedRowKeys: postServerIds,
        }}
      />
    );
  }

  const [openCreateNpmProjectModal, setOpenCreateNpmProjectModal] =
    useState(false);

  const [currentProject, setCurrentProject] = useState<
    { id: number; path: string } | undefined
  >();
  const [npmProjectForm] = Form.useForm();

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
            <h3 id={idKey} className={errorAnchorCls}>
              {errorText}
            </h3>,
          );
          return _match;
        }
        htmlParts.push(
          <h3 id={idKey} className={errorAnchorCls}>
            <Button
              type="link"
              className={css`
                color: red;
              `}
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
      <div
        className={css`
          display: flex;
          align-items: center;
        `}
      >
        <Space
          className={css`
            margin: 10px 5px;
          `}
        >
          <Segmented
            options={['项目分组', '服务分组']}
            defaultValue={groupByNpmProject ? '项目分组' : '服务分组'}
            onChange={(value) => {
              if (value === '项目分组') {
                setGroupByNpmProject(true);
              } else {
                setGroupByNpmProject(false);
              }
            }}
          />
          {groupByNpmProject && (
            <>
              <Button
                onClick={() => {
                  setOpenCreateNpmProjectModal(true);
                  npmProjectForm.resetFields();
                }}
                type="primary"
              >
                添加项目
              </Button>

              <Button
                onClick={() => {
                  setNodeServerStates(rootNodeServerStates);
                  setModifyNodeServerType('批量添加修改');
                }}
                type="primary"
              >
                整体编辑
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setNodeServerStates([]);
                  setModifyNodeServerType('添加服务');
                }}
              >
                添加服务
              </Button>
            </>
          )}
        </Space>
        <Button
          className={css`
            margin-left: auto;
          `}
          onClick={() => {
            Modal.confirm({
              title: '是否关闭控制台？',
              icon: <ExclamationCircleFilled />,
              content: '关闭后台运行进程',
              onOk() {
                jsonFetcher('/api/npmProjects/shutdown', 'PUT');
              },
            });
          }}
          type="link"
        >
          关闭控制台
        </Button>
      </div>
      {!groupByNpmProject && rootNodeServerResponses.length > 0 && (
        <Table
          pagination={false}
          dataSource={rootNodeServerResponses.map((e) => ({ ...e, key: e.id }))}
          columns={nodeServerColumn}
          expandable={{
            expandedRowRender: Nested,
            defaultExpandedRowKeys: rootNodeServerResponses
              .filter((f) => nodeServerInfo && nodeServerInfo[f.id] != null)
              .map((c) => c.id),
          }}
        />
      )}
      {groupByNpmProject && npmProjects?.length ? (
        <Table
          pagination={false}
          dataSource={npmProjects.map((p) => ({ ...p, key: p.id }))}
          expandable={{
            expandedRowRender,
          }}
          columns={[
            {
              dataIndex: 'path',
              title: '路径',
            },
            {
              title: '操作',
              render: (_, record) => (
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      setCurrentProject(record);
                      setOpenCreateNpmProjectModal(true);
                      npmProjectForm.setFieldValue('path', record.path);
                    }}
                  >
                    编辑
                  </Button>

                  <Popconfirm
                    title="删除项目"
                    description="是否要删除项目"
                    onConfirm={() => {
                      jsonFetcher(
                        `/api/npmProjects/${record.id}`,
                        'DELETE',
                      ).then(() => {
                        message.success('删除成功');
                        refetchNpmProjects();
                      });
                    }}
                  >
                    <Button type="link">删除</Button>
                  </Popconfirm>
                </Space>
              ),
            },
          ]}
        />
      ) : null}
      <Modal
        open={openCreateNpmProjectModal}
        title={`${currentProject ? '编辑' : '添加'}项目`}
        onCancel={() => setOpenCreateNpmProjectModal(false)}
        onOk={() => {
          npmProjectForm.validateFields().then((values: { path: string }) => {
            npmProjectForm.resetFields();
            if (currentProject) {
              jsonFetcher('/api/npmProjects', 'PUT', {
                path: values.path,
                id: currentProject.id,
              }).then(() => {
                refetchNpmProjects();
                setOpenCreateNpmProjectModal(false);
                message.success('修改项目成功');
              });
              return;
            }
            jsonFetcher('/api/npmProjects', 'POST', values).then(() => {
              refetchNpmProjects();
              setOpenCreateNpmProjectModal(false);
              message.success('创建项目成功');
            });
          });
        }}
      >
        <Form form={npmProjectForm} layout="vertical" name="path">
          <Form.Item
            name="path"
            label="path"
            rules={[
              {
                required: true,
                message: 'Please input the path of project',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={modifyNodeServerType}
        open={modifyNodeServerType !== null}
        onCancel={() => {
          setModifyNodeServerType(null);
        }}
        okText="保存"
        cancelText="取消"
        onOk={() => {
          if (modifyNodeServerType === null) {
            return;
          }
          const extract = (state: NodeServerState[]): NodeServerPayload[] =>
            state.map((nodeServerState): NodeServerPayload => {
              const nodeServer: NodeServerPayload = {
                ...nodeServerState.form?.getFieldsValue(true),
              };
              nodeServer.postServers ??= [];
              nodeServer.portConfigFileRelativePath = encodeURIComponent(
                nodeServer.portConfigFileRelativePath,
              );
              nodeServer.portReg = encodeURIComponent(nodeServer.portReg);

              nodeServer.postServers = extract(nodeServerState.postServers);
              return nodeServer;
            });
          const nodeServers = extract(nodeServerStates);

          if (modifyNodeServerType === '批量添加修改') {
            jsonFetcher('/api/nodeServers/batch', 'POST', nodeServers).then(
              () => {
                message.success('保存服务成功');
                refetchNpmProjects();
                setModifyNodeServerType(null);
              },
            );
            return;
          }

          nodeServers.forEach((nodeServer) => {
            jsonFetcher('/api/nodeServers', 'POST', nodeServer).then(() => {
              message.success('保存服务成功');
              refetchNpmProjects();
              setModifyNodeServerType(null);
            });
          });
        }}
        width="80vw"
      >
        <InnerForm
          nodeServerStates={nodeServerStates}
          rootNodeServerStates={nodeServerStates}
          updateRootNodeServerStates={setNodeServerStates}
          hideAddButtons={modifyNodeServerType === '编辑'}
          nodeIdMapNodeServerState={nodeIdMapNodeServerState}
        />
      </Modal>
      <Modal
        open={currentNodeServer !== null && nodeServerInfo !== undefined}
        onCancel={() => setCurrentNodeServer(null)}
        footer={null}
        title={
          <Space
            className={css`
              display: flex;
              align-items: center;
            `}
          >
            <Status
              nodeServerInfo={nodeServerInfo}
              nodeServerId={currentNodeServer}
              nodeServerName={
                currentNodeServer
                  ? nodeIdMapNodeServerResponse[currentNodeServer]?.name
                  : ''
              }
              errorAnchorIds={errorAnchorIds}
            />

            <Button
              type="link"
              onClick={() =>
                jsonFetcher(
                  `/api/nodeServers/clearLog/${currentNodeServer}`,
                  'GET',
                ).then(() => refetchLog())
              }
            >
              清除日志
            </Button>
          </Space>
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

export default NodeServerManagement;
