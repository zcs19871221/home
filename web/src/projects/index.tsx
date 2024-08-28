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
  BaseProcess,
  ProcessesCreatedOrUpdated,
  Project,
  ProjectCreatedOrUpdated,
  processesApiBase,
  projectApiBase,
} from './types.ts';
import VscodeOpener from '../common/VscodeOpener.tsx';

export default function ProjectComponent() {
  const { data, mutate, isLoading } = useAppSwr<Project[]>(projectApiBase);

  const [projectForm] = Form.useForm<ProjectCreatedOrUpdated>();

  const [processesForm] = Form.useForm<ProcessesCreatedOrUpdated>();

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showProcessesForm, setShowProcessesForm] = useState(false);

  const expandedRowRender = (record: Project) => (
    <Table
      rowKey="id"
      columns={[
        { title: '命令', dataIndex: 'command' },
        { title: '描述', dataIndex: 'description' },
        { title: '端口', dataIndex: 'port' },
        {
          title: '操作',
          render: (_, processesRecord: BaseProcess) => (
            <div className="space-x-10">
              <Tooltip title="删除服务">
                <DeleteOutlined
                  onClick={() => {
                    Modal.confirm({
                      title: '是否删除服务?',
                      icon: <ExclamationCircleFilled />,
                      onOk() {
                        jsonFetcher(
                          `${projectApiBase}/${processesRecord.id}`,
                          'DELETE',
                        ).then(() => {
                          message.success('删除成功');
                          mutate();
                          setShowProjectForm(false);
                        });
                      },
                    });
                  }}
                />
              </Tooltip>
              <Tooltip title="编辑服务">
                <EditOutlined
                  onClick={() => {
                    processesForm.setFieldsValue({
                      ...processesRecord,
                      projectId: record.id,
                    });
                    setShowProcessesForm(true);
                  }}
                />
              </Tooltip>
              <VscodeOpener command={record.path} />
            </div>
          ),
        },
      ]}
      dataSource={record.appProcesses}
      pagination={false}
    />
  );

  const currentProjectId = processesForm.getFieldValue('projectId');
  const projectPath = data?.find((n) => n.id === currentProjectId)?.path;
  const { data: pkgJson } = useSWR(
    projectPath
      ? `${base}/system/read?path=${encodeURIComponent(`${projectPath}/package.json`)}`
      : undefined,
    bufferFetcher,
  );

  return (
    <div>
      <div className="flex justify-center items-center h-8 ">
        <h2 className="mr-auto">项目管理</h2>
        <Tooltip title="增加project" placement="leftBottom">
          <FileAddOutlined
            onClick={() => {
              projectForm.setFieldsValue({
                path: '',
                description: '',
              });
              setShowProjectForm(true);
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
              render: (_, row: Project) => (
                <div className="space-x-5">
                  <Tooltip title="添加processes到所属项目">
                    <FileAddOutlined
                      onClick={() => {
                        processesForm.resetFields();
                        processesForm.setFieldsValue({
                          projectId: row.id,
                        });
                        setShowProcessesForm(true);
                      }}
                    />
                  </Tooltip>

                  <Tooltip title="编辑项目">
                    <EditOutlined
                      onClick={() => {
                        projectForm.setFieldsValue(row);
                        setShowProjectForm(true);
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
                              `${projectApiBase}/${row.id}`,
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
        open={showProjectForm}
        title={
          projectForm.getFieldValue('id') === undefined
            ? '新建项目'
            : '编辑项目'
        }
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => setShowProjectForm(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={projectForm}
            name="form_in_modal"
            onFinish={(values) => {
              let path = values.path.trim();
              path = path.replace(/\\+/g, '/').replace(/\/+/g, '/');
              const id = projectForm.getFieldValue('id');
              jsonFetcher(projectApiBase, id ? 'PUT' : 'POST', {
                ...values,
                id,
                path,
              }).then(() => {
                message.success('操作成功');
                setShowProjectForm(false);
                mutate();
              });
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
        open={showProcessesForm}
        title={
          processesForm.getFieldValue('id') === undefined
            ? '新建服务'
            : '编辑服务'
        }
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => setShowProcessesForm(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={processesForm}
            name="form_in_modal"
            onFinish={(values) => {
              const id = processesForm.getFieldValue('id');

              jsonFetcher(processesApiBase, id !== undefined ? 'PUT' : 'POST', {
                ...values,
                id,
                projectId: processesForm.getFieldValue('projectId'),
              }).then(() => {
                message.success('操作成功');
                mutate();
                setShowProcessesForm(false);
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
