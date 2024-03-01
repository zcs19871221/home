/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import { css } from '@linaria/core';
import { Button, Card, Form, Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { NodeServerState } from './types.ts';
import useNpmProjects from './useNpmProjects.ts';
import nodeServerTemplates from './nodeServerTemplates.ts';

interface CommonProps {
  rootNodeServerStates: NodeServerState[];
  updateRootNodeServerStates: (states: NodeServerState[]) => void;
}
export function MyForm({
  rootNodeServerStates,
  updateRootNodeServerStates,
  nodeServerState,
}: CommonProps & { nodeServerState: NodeServerState }) {
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
        label="名称"
        rules={[
          {
            required: true,
            message: '输入服务名称',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="command"
        label="npm 命令"
        rules={[
          {
            required: true,
            message: '输入npm启动命令',
          },
          {
            pattern: /^npm /,
            message: '以npm 开头',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="npmProjectId"
        label="所属项目"
        rules={[
          {
            required: true,
            message: '输入npm启动命令',
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
        label="port配置文件相对地址"
        rules={[
          {
            required: true,
            message: '输入port配置文件相对地址',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="portReg"
        label="port配置文件正则"
        rules={[
          {
            required: true,
            message: '输入正则',
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
        <Input placeholder="输入正则，必须包含括号以获取端口" />
      </Form.Item>
      <Form.Item label="子服务">
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
}: {
  nodeServerStates: NodeServerState[];
  prevNodeServerState?: NodeServerState;
  rootNodeServerStates: NodeServerState[];
  updateRootNodeServerStates: (states: NodeServerState[]) => void;
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
          />
          <Button
            onClick={() => {
              nodeServerStates.splice(index, 1);
              updateBottom2Top();
            }}
          >
            删除服务
          </Button>
        </Card>
      ))}
      <Space
        className={css`
          margin-top: 10px;
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
            {template.name}模板
          </Button>
        ))}
      </Space>
    </Card>
  );
}
