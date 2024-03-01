import { css } from '@linaria/core';
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
import { useMemo, useState } from 'react';
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
import request from './request.tsx';

function Se() {
  const { data: npmProjects, mutate: refetchNpmProjects } = useNpmProjects();

  const [nodeServerStates, setNodeServerStates] = useState<NodeServerState[]>(
    [],
  );

  const { nodeIdMapNodeServerResponse, rootNodeServerResponses } =
    useMemo(() => {
      const nodeIdMapNodeServerState: Record<number, NodeServerState> = {};
      const idMapNodeServerResponse: Record<number, NodeServerResponse> = {};
      const rootNodeServerStates: NodeServerState[] = [];
      const rootResponses: NodeServerResponse[] = [];

      npmProjects?.forEach((npmProject) => {
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
          nodeIdMapNodeServerState[nodeServerResponse.id] = nodeServerState;
          idMapNodeServerResponse[nodeServerResponse.id] = nodeServerResponse;
          if (!nodeServerResponse.prevServerId) {
            rootResponses.push(nodeServerResponse);
            rootNodeServerStates.push(nodeServerState);
          }
        });
      });

      Object.values(nodeIdMapNodeServerState).forEach((nodeState) => {
        const nodeServerState = nodeState;
        nodeServerState.prevServer = nodeServerState.prevServerId
          ? nodeIdMapNodeServerState[nodeServerState.prevServerId]
          : undefined;
        nodeServerState.postServers =
          nodeServerState.postServerIds?.map(
            (postServerId) => nodeIdMapNodeServerState[postServerId],
          ) ?? [];
      });

      setNodeServerStates(rootNodeServerStates);

      return {
        rootNodeServerResponses: rootResponses,
        nodeIdMapNodeServerResponse: idMapNodeServerResponse,
      };
    }, [npmProjects]);

  const [currentNodeServer, setCurrentNodeServer] = useState<number | null>(
    null,
  );

  const [groupByNpmProject, setGroupByNpmProject] = useState(false);

  const { data: nodeServerInfo, mutate: refetchLogInfos } = useSWR<{
    [id: number]: LogInfo;
  }>(`${base}/api/nodeServers/runningInfos`, {
    revalidateIfStale: true,
    revalidateOnMount: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    ...(!groupByNpmProject && { refreshInterval: 1000 }),
  });

  const operator = (type: 'start' | 'stop' | 'restart', nodeServerId: number) =>
    request(`/api/nodeServers/${type}/${nodeServerId}`, 'PUT').then(() => {
      message.success(`${type}指令已发送`);
    });

  const renderStatus = (
    nodeServerId?: number | null,
    nodeServerName?: string,
  ) => {
    let text = '';
    let color: TagProps['color'] = 'processing';

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
      <Space
        className={css`
          display: flex;
          align-items: center;
        `}
      >
        <div>{nodeServerName ?? ''}</div>
        <Tag bordered={false} color={color}>
          {text}
        </Tag>
      </Space>
    );
  };

  const nodeServerColumn = [
    {
      title: '名称',
      dataIndex: 'name',
      render: (_value: unknown, record: NodeServerResponse) =>
        renderStatus(record.id, record.name),
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
              request(
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
              <Popconfirm
                title="删除服务"
                description="是否要删除服务"
                onConfirm={() => {
                  request(`/api/nodeServers/${record.id}`, 'DELETE').then(
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
                    request(
                      `/api/npmProjects/vscode/${record.npmProjectId}`,
                      'GET',
                    )
                  }
                >
                  vscode
                </Button>
                {(!info || info.status === NodeServerStatus.CLOSED) && (
                  <Button
                    type="link"
                    onClick={() =>
                      operator('start', record.id as number).then(() => {
                        refetchLogInfos();
                      })
                    }
                  >
                    启动
                  </Button>
                )}
                {info && (
                  <>
                    <Button
                      type="link"
                      onClick={() => setCurrentNodeServer(record.id ?? null)}
                    >
                      日志
                    </Button>
                    <Button
                      type="link"
                      onClick={() =>
                        operator('restart', record.id).then(() => {
                          refetchLogInfos();
                        })
                      }
                    >
                      重启
                    </Button>
                    {info.status !== NodeServerStatus.CLOSED && (
                      <Button
                        type="link"
                        onClick={() => operator('stop', record.id)}
                      >
                        关闭
                      </Button>
                    )}
                  </>
                )}
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
        {...(postServerIds.length > 0 && {
          expandable: {
            expandedRowRender: Nested,
            defaultExpandedRowKeys: postServerIds,
          },
        })}
      />
    );
  }

  const [openCreateNpmProjectModal, setOpenCreateNpmProjectModal] =
    useState(false);

  const [currentProject, setCurrentProject] = useState<
    { id: number; path: string } | undefined
  >();
  const [npmProjectForm] = Form.useForm();

  const [openCreateNodeServer, setOpenCreateNodeServer] = useState(false);

  return (
    <div>
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
                setOpenCreateNodeServer(true);
              }}
              type="primary"
            >
              整体编辑服务
            </Button>
          </>
        )}
      </Space>
      {!groupByNpmProject && rootNodeServerResponses.length > 0 && (
        <Table
          pagination={false}
          dataSource={rootNodeServerResponses.map((e) => ({ ...e, key: e.id }))}
          columns={nodeServerColumn}
          expandable={{
            expandedRowRender: Nested,
            defaultExpandedRowKeys: rootNodeServerResponses.map((c) => c.id),
          }}
        />
      )}
      {groupByNpmProject && npmProjects?.length ? (
        <Table
          pagination={false}
          dataSource={npmProjects.map((p) => ({ ...p, key: p.id }))}
          expandable={{
            expandedRowRender,
            defaultExpandedRowKeys: npmProjects?.map((p) => p.id),
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
                  <Popconfirm
                    title="删除项目"
                    description="是否要删除项目"
                    onConfirm={() => {
                      request(`/api/npmProjects/${record.id}`, 'DELETE').then(
                        () => {
                          message.success('删除成功');
                          refetchNpmProjects();
                        },
                      );
                    }}
                  >
                    <Button type="link">删除</Button>
                  </Popconfirm>
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
                  <Button
                    type="primary"
                    onClick={() => {
                      setCurrentProject(record);
                      setOpenCreateNpmProjectModal(true);
                      npmProjectForm.setFieldValue('path', record.path);
                    }}
                  >
                    添加服务
                  </Button>
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
              request('/api/npmProjects', 'PUT', {
                path: values.path,
                id: currentProject.id,
              }).then(() => {
                refetchNpmProjects();
                setOpenCreateNpmProjectModal(false);
                message.success('修改项目成功');
              });
              return;
            }
            request('/api/npmProjects', 'POST', values).then(() => {
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
        title="编辑或添加服务"
        open={openCreateNodeServer}
        onCancel={() => {
          setOpenCreateNodeServer(false);
        }}
        okText="保存"
        cancelText="取消"
        onOk={() => {
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
          request('/api/nodeServers/batch', 'POST', nodeServers).then(() => {
            message.success('保存服务成功');
            refetchNpmProjects();
            setOpenCreateNodeServer(false);
          });
        }}
        width="80vw"
      >
        <InnerForm
          nodeServerStates={nodeServerStates}
          rootNodeServerStates={nodeServerStates}
          updateRootNodeServerStates={setNodeServerStates}
        />
      </Modal>
      <Modal
        open={currentNodeServer !== null}
        onCancel={() => setCurrentNodeServer(null)}
        footer={null}
        title={
          <Space
            className={css`
              display: flex;
              align-items: center;
            `}
          >
            {renderStatus(
              currentNodeServer,
              currentNodeServer
                ? nodeIdMapNodeServerResponse[currentNodeServer]?.name
                : '',
            )}
            <Button
              type="link"
              onClick={() =>
                request(`/api/nodeServers/clearLog/${currentNodeServer}`, 'GET')
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
        {currentNodeServer && nodeServerInfo && (
          <div
            className={css`
              white-space: pre-wrap;
            `}
          >
            {nodeServerInfo[currentNodeServer]?.log}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Se;
