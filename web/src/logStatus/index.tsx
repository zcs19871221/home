import { useIntl } from 'react-intl';
import {
  Button,
  Checkbox,
  ColorPicker,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Tooltip,
  message,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  FileAddOutlined,
  CloseOutlined,
} from '@ant-design/icons';

import { useState } from 'react';
import { Color } from 'antd/es/color-picker/color';
import { useAppSwr, jsonFetcher } from '../common/fetcher.tsx';
import {
  statusApiBase,
  StatusCreatedOrUpdated,
  StatusResponse,
} from './types.ts';

export const statusColumns = [
  {
    dataIndex: 'name',
    title: '日志状态名称',
  },
  {
    dataIndex: 'label',
    title: '日志状态标签',
    render: (label: string, r: StatusResponse) => (
      <span style={{ color: r.color }}>{label}</span>
    ),
  },
  {
    dataIndex: 'matchers',
    title: '日志状态匹配规则',
    render: (matchers: string[]) => (
      <>
        {matchers.map((matcher) => (
          <div>{matcher}</div>
        ))}
      </>
    ),
  },
  {
    dataIndex: 'clear',
    title: '当前状态是否清除之前日志',
    render: (val: boolean) => (val ? '清除日志' : '不清除日志'),
  },
];
export default function LogStatus() {
  const intl = useIntl();

  const { data, mutate, isLoading } =
    useAppSwr<StatusResponse[]>(statusApiBase);

  const [form] = Form.useForm<StatusCreatedOrUpdated>();

  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex justify-center items-center h-8 ">
        <h2 className="mr-auto">日志状态管理</h2>
        <Tooltip title="增加日志状态" placement="leftBottom">
          <FileAddOutlined
            onClick={() => {
              form.resetFields();
              setShowForm(true);
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
          columns={[
            ...statusColumns,
            {
              title: intl.formatMessage({
                id: 'key0024',
                defaultMessage: '操作',
              }),
              render: (_, row) => (
                <div className="space-x-5">
                  <Tooltip
                    title={intl.formatMessage({
                      id: 'key0032',
                      defaultMessage: '编辑项目',
                    })}
                  >
                    <EditOutlined
                      onClick={() => {
                        form.setFieldsValue(row);
                        setShowForm(true);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="删除日志状态配置">
                    <DeleteOutlined
                      onClick={() => {
                        Modal.confirm({
                          title: intl.formatMessage({
                            id: 'key0034',
                            defaultMessage: '是否删除?',
                          }),
                          icon: <ExclamationCircleFilled />,
                          onOk() {
                            jsonFetcher(
                              `${statusApiBase}/${row.id}`,
                              'DELETE',
                            ).then(() => {
                              message.success(
                                intl.formatMessage({
                                  id: 'key0027',
                                  defaultMessage: '删除成功',
                                }),
                              );
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
        open={showForm}
        title={
          form.getFieldValue('id') === undefined
            ? intl.formatMessage({
                id: 'key0036',
                defaultMessage: '新建项目',
              })
            : intl.formatMessage({
                id: 'key0032',
                defaultMessage: '编辑项目',
              })
        }
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => setShowForm(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            onFinish={(values) => {
              const id = form.getFieldValue('id');
              jsonFetcher(statusApiBase, id ? 'PUT' : 'POST', {
                ...values,
                id,
              }).then(() => {
                message.success(
                  intl.formatMessage({
                    id: 'key0037',
                    defaultMessage: '操作成功',
                  }),
                );
                setShowForm(false);
                mutate();
              });
            }}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="matchers"
          label="匹配规则"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'key0039',
                defaultMessage: '文件夹地址不能为空',
              }),
              validator: (_, value) => {
                try {
                  // eslint-disable-next-line no-new
                  new RegExp(value);
                  return Promise.resolve();
                } catch {
                  return Promise.reject(new Error('不是有效的正则表达式'));
                }
              },
            },
          ]}
        >
          <Form.List name="matchers">
            {(subFields, subOpt) => (
              <div
                style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}
              >
                {subFields.map((subField, index) => (
                  <Space key={subField.key}>
                    <Form.Item noStyle name={index}>
                      <Input placeholder="first" />
                    </Form.Item>
                    <CloseOutlined
                      onClick={() => {
                        subOpt.remove(subField.name);
                      }}
                    />
                  </Space>
                ))}
                <Button type="dashed" onClick={() => subOpt.add()} block>
                  + Add Sub Item
                </Button>
              </div>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item name="name" label="名称">
          <Input />
        </Form.Item>
        <Form.Item name="label" label="标签名">
          <Input />
        </Form.Item>
        <Form.Item
          name="color"
          label="标签颜色"
          getValueFromEvent={(color: Color) => color.toHexString()}
        >
          <ColorPicker />
        </Form.Item>
        <Form.Item
          name="clear"
          label="是否清除之前日志"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
      </Modal>
    </div>
  );
}
