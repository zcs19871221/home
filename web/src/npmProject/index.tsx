import {
  AutoComplete,
  Form,
  Input,
  InputNumber,
  Modal,
  Table,
  Tooltip,
  message,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  FileAddOutlined,
} from '@ant-design/icons';

import { useState } from 'react';
import useSWR from 'swr';
import { DefaultOptionType } from 'antd/es/select/index';
import {
  useAppSwr,
  jsonFetcher,
  bufferFetcher,
  base,
} from '../common/fetcher.tsx';
import {
  BaseNodeServer,
  NodeServerCreatedOrUpdated,
  NpmProject,
  NpmProjectCreatedOrUpdated,
  nodeServerApiBase,
  npmApiBase,
} from './types.ts';

export default function Project() {
  const { data, mutate, isLoading } = useAppSwr<NpmProject[]>(npmApiBase);

  const [npmProjectForm] = Form.useForm<NpmProjectCreatedOrUpdated>();

  const [nodeServerForm] = Form.useForm<NodeServerCreatedOrUpdated>();

  const [showNpmProjectForm, setShowNpmProjectForm] = useState(false);
  const [showNodeServerForm, setShowNodeServerForm] = useState(false);

  const expandedRowRender = (record: NpmProject) => (
    <Table
      rowKey="id"
      columns={[
        { title: '命令', dataIndex: 'command' },
        { title: '描述', dataIndex: 'description' },
        { title: '端口', dataIndex: 'port' },
        {
          title: '操作',
          render: (_, nodeServerRecord: BaseNodeServer) => (
            <div className="space-x-10">
              <Tooltip title="删除服务">
                <DeleteOutlined
                  onClick={() => {
                    Modal.confirm({
                      title: '是否删除服务?',
                      icon: <ExclamationCircleFilled />,
                      onOk() {
                        jsonFetcher(
                          `${npmApiBase}/${nodeServerRecord.id}`,
                          'DELETE',
                        ).then(() => {
                          message.success('删除成功');
                          mutate();
                          setShowNpmProjectForm(false);
                        });
                      },
                    });
                  }}
                />
              </Tooltip>
              <Tooltip title="编辑服务">
                <EditOutlined
                  onClick={() => {
                    nodeServerForm.setFieldsValue({
                      ...nodeServerRecord,
                      npmProjectId: record.id,
                    });
                    setShowNodeServerForm(true);
                  }}
                />
              </Tooltip>
            </div>
          ),
        },
      ]}
      dataSource={record.nodeServers}
      pagination={false}
    />
  );

  const currentNpmId = nodeServerForm.getFieldValue('npmProjectId');
  const npmPath = data?.find((n) => n.id === currentNpmId)?.path;
  const { data: pkgJson } = useSWR(
    npmPath
      ? `${base}/io/read?path=${encodeURIComponent(`${npmPath}/package.json`)}`
      : undefined,
    bufferFetcher,
  );

  return (
    <div>
      <div className="flex justify-center items-center h-8 ">
        <h2 className="mr-auto">项目管理</h2>
        <Tooltip title="增加npmProject">
          <FileAddOutlined
            onClick={() => {
              npmProjectForm.setFieldsValue({
                path: '',
                description: '',
              });
              setShowNpmProjectForm(true);
            }}
          />
        </Tooltip>
      </div>
      {data !== undefined && (
        <Table
          rowKey="id"
          dataSource={data}
          loading={isLoading}
          pagination={false}
          expandable={{ expandedRowRender, defaultExpandAllRows: true }}
          columns={[
            {
              dataIndex: 'path',
              title: '地址',
            },
            {
              dataIndex: 'description',
              title: '描述',
            },
            {
              title: '操作',
              render: (_, row: NpmProject) => (
                <div className="space-x-5">
                  <Tooltip title="添加nodeServer到所属项目">
                    <FileAddOutlined
                      onClick={() => {
                        nodeServerForm.resetFields();
                        nodeServerForm.setFieldsValue({
                          npmProjectId: row.id,
                        });
                        setShowNodeServerForm(true);
                      }}
                    />
                  </Tooltip>

                  <Tooltip title="编辑项目">
                    <EditOutlined
                      onClick={() => {
                        npmProjectForm.setFieldsValue(row);
                        setShowNpmProjectForm(true);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="删除项目">
                    <DeleteOutlined
                      onClick={() => {
                        Modal.confirm({
                          title: '是否删除项目?',
                          icon: <ExclamationCircleFilled />,
                          content: '同时删除拥有的服务',
                          onOk() {
                            jsonFetcher(
                              `${npmApiBase}/${row.id}`,
                              'DELETE',
                            ).then(() => {
                              message.success('删除成功');
                              mutate();
                            });
                          },
                        });
                      }}
                    />
                  </Tooltip>
                </div>
              ),
            },
          ]}
        />
      )}
      <Modal
        open={showNpmProjectForm}
        title={
          npmProjectForm.getFieldValue('id') === undefined
            ? '新建项目'
            : '编辑项目'
        }
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => setShowNpmProjectForm(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={npmProjectForm}
            name="form_in_modal"
            onFinish={(values) => {
              let path = values.path.trim();
              path = path.replace(/\\+/g, '/').replace(/\/+/g, '/');
              const id = npmProjectForm.getFieldValue('id');
              jsonFetcher(npmApiBase, id ? 'PUT' : 'POST', {
                ...values,
                id,
                path,
              }).then(() => mutate());
            }}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="path"
          label="文件夹地址"
          rules={[
            {
              required: true,
              message: '文件夹地址不能为空',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="名称或描述">
          <Input />
        </Form.Item>
      </Modal>

      <Modal
        open={showNodeServerForm}
        title={
          nodeServerForm.getFieldValue('id') === undefined
            ? '新建node服务'
            : '编辑node服务'
        }
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => setShowNodeServerForm(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={nodeServerForm}
            name="form_in_modal"
            onFinish={(values) => {
              const id = nodeServerForm.getFieldValue('id');

              jsonFetcher(
                nodeServerApiBase,
                id !== undefined ? 'PUT' : 'POST',
                {
                  ...values,
                  id,
                  npmProjectId: nodeServerForm.getFieldValue('npmProjectId'),
                },
              ).then(() => {
                mutate();
                setShowNodeServerForm(false);
              });
            }}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="command"
          label="命令"
          rules={[
            {
              required: true,
              message: '命令不能为空',
            },
          ]}
        >
          <AutoComplete
            options={
              pkgJson
                ? Object.keys(JSON.parse(pkgJson).scripts).reduce(
                    (commands, command) => {
                      commands.push({
                        label: command,
                        value: `npm run ${command}`,
                      });
                      return commands;
                    },
                    [] as DefaultOptionType[],
                  )
                : []
            }
          />
        </Form.Item>
        <Form.Item
          name="port"
          label="端口"
          rules={[
            {
              required: true,
              message: '端口不能为空',
            },
          ]}
        >
          <InputNumber min={1024} max={49151} />
        </Form.Item>
        <Form.Item name="description" label="名称或描述">
          <Input />
        </Form.Item>
      </Modal>
    </div>
  );
}
