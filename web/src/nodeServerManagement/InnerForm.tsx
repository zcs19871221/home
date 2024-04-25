import { useIntl, FormattedMessage } from 'react-intl';
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import { css } from '@linaria/core';
import { Button, Card, Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { NodeServerState } from './types.ts';
import useNpmProjects from './useNpmProjects.ts';
import nodeServerTemplates from './nodeServerTemplates.ts';

interface CommonProps {
  rootNodeServerStates: NodeServerState[];
  updateRootNodeServerStates: (states: NodeServerState[]) => void;
  nodeIdMapNodeServerState: Record<number, NodeServerState>;
}
export function MyForm({
  rootNodeServerStates,
  updateRootNodeServerStates,
  nodeServerState,
  nodeIdMapNodeServerState,
}: CommonProps & { nodeServerState: NodeServerState }) {
  const intl = useIntl();

  const [npmProjectId, setNpmProjectId] = useState<undefined | number>();

  const { data: npmProjects } = useNpmProjects();

  const [nodeServerForm] = Form.useForm();

  useEffect(() => {
    nodeServerState.form = nodeServerForm;
  }, [nodeServerState, nodeServerForm]);

  return (
    <Form
      form={nodeServerForm}
      layout="horizontal"
      initialValues={nodeServerState}
    >
      <Form.Item
        name="name"
        label={intl.formatMessage({
          id: 'key0001',
          defaultMessage: '名称',
        })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'key0002',
              defaultMessage: '输入服务名称',
            }),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="command"
        label={intl.formatMessage({
          id: 'key0003',
          defaultMessage: 'npm 命令',
        })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'key0004',
              defaultMessage: '输入npm启动命令',
            }),
          },
          {
            pattern: /^npm /,
            message: intl.formatMessage({
              id: 'key0005',
              defaultMessage: '以npm 开头',
            }),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="npmProjectId"
        label={intl.formatMessage({
          id: 'key0006',
          defaultMessage: '所属项目',
        })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'key0004',
              defaultMessage: '输入npm启动命令',
            }),
          },
        ]}
      >
        <Select value={npmProjectId} onChange={setNpmProjectId}>
          {npmProjects?.map((npmProject) => (
            <Select.Option value={npmProject.id} key={npmProject.id}>
              {npmProject.path}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="portConfigFileRelativePath"
        label={intl.formatMessage({
          id: 'key0007',
          defaultMessage: 'port配置文件相对地址',
        })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'key0008',
              defaultMessage: '输入port配置文件相对地址',
            }),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="portReg"
        label={intl.formatMessage({
          id: 'key0009',
          defaultMessage: 'port配置文件正则',
        })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'key0010',
              defaultMessage: '输入正则',
            }),
          },
          {
            validator: (_, value) => {
              try {
                // eslint-disable-next-line no-new
                new RegExp(String(value));
                return Promise.resolve();
              } catch {
                return Promise.reject(new Error('not valid RegExp'));
              }
            },
          },
        ]}
      >
        <Input
          placeholder={intl.formatMessage({
            id: 'key0011',
            defaultMessage: '输入正则，必须包含括号以获取端口',
          })}
        />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({
          id: 'key0012',
          defaultMessage: '子服务',
        })}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 16,
          }}
        >
          <InnerForm
            nodeServerStates={nodeServerState.postServers ?? []}
            prevNodeServerState={nodeServerState}
            rootNodeServerStates={rootNodeServerStates}
            updateRootNodeServerStates={updateRootNodeServerStates}
            nodeIdMapNodeServerState={nodeIdMapNodeServerState}
          />
        </div>
      </Form.Item>
    </Form>
  );
}

let id = 0;
export function InnerForm({
  rootNodeServerStates,
  updateRootNodeServerStates,
  nodeServerStates,
  prevNodeServerState,
  hideAddButtons = false,
  nodeIdMapNodeServerState,
}: {
  nodeServerStates: NodeServerState[];
  prevNodeServerState?: NodeServerState;
  rootNodeServerStates: NodeServerState[];
  hideAddButtons?: boolean;
  updateRootNodeServerStates: (states: NodeServerState[]) => void;
  nodeIdMapNodeServerState: Record<number, NodeServerState>;
}) {
  const updateBottom2Top = () => {
    let states = [...nodeServerStates];

    let prev: NodeServerState | undefined = prevNodeServerState;

    while (prev) {
      prev.postServers = states;
      const prevPrev: NodeServerState | undefined = prev.prevServer;
      const prevStates = prevPrev?.postServers ?? rootNodeServerStates;

      prevStates[prevStates.indexOf(prev)] = { ...prev };
      states = [...prevStates];
      prev = prevPrev;
    }
    updateRootNodeServerStates(states);
  };

  return (
    <Card>
      {nodeServerStates.map((postServerState, index) => (
        <Card
          className={css`
            &:not(:first-child) {
              margin-top: 10px;
            }
          `}
        >
          <MyForm
            key={postServerState.id ?? postServerState.tmpId}
            nodeServerState={postServerState}
            updateRootNodeServerStates={updateRootNodeServerStates}
            rootNodeServerStates={rootNodeServerStates}
            nodeIdMapNodeServerState={nodeIdMapNodeServerState}
          />
          <Button
            onClick={() => {
              nodeServerStates.splice(index, 1);
              updateBottom2Top();
            }}
          >
            <FormattedMessage id="key0013" defaultMessage="删除服务" />
          </Button>
        </Card>
      ))}
      {!hideAddButtons && (
        <div
          className={css`
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
          `}
        >
          {nodeServerTemplates.map((template) => (
            <Button
              type="primary"
              onClick={() => {
                nodeServerStates.push({
                  ...template.value,
                  tmpId: `tmp${id++}`,
                  prevServer: prevNodeServerState,
                });

                updateBottom2Top();
              }}
            >
              <FormattedMessage
                id="key0014"
                defaultMessage="{v1}模板"
                values={{ v1: template.name }}
              />
            </Button>
          ))}
          <div
            className={css`
              width: 150px;
              flex: 0 0 auto;
            `}
          >
            <Select
              className={css`
                width: 100%;
              `}
              onChange={(selectedId: number) => {
                nodeServerStates.push({
                  ...nodeIdMapNodeServerState[selectedId],
                  tmpId: `tmp${selectedId++}`,
                  prevServer: prevNodeServerState,
                });

                updateBottom2Top();
              }}
            >
              {Object.values(nodeIdMapNodeServerState).map(
                (nodeServerState) => (
                  <Select.Option
                    value={nodeServerState.id}
                    key={nodeServerState.id}
                  >
                    {nodeServerState.name}
                  </Select.Option>
                )
              )}
            </Select>
          </div>
        </div>
      )}
    </Card>
  );
}
