import { FormattedMessage, useIntl } from 'react-intl';
import {
  Button,
  Checkbox,
  ColorPicker,
  ColorPickerProps,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Tooltip,
  message,
  theme,
} from 'antd';
import { generate, green, presetPalettes, red, blue } from '@ant-design/colors';
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
import { i18n } from '../i18n/index.tsx';

export const useStatusColumns = () => [
  {
    dataIndex: 'name',
    title: i18n.intl.formatMessage({
      id: 'key0046',
      defaultMessage: '日志状态名称',
    }),
  },
  {
    dataIndex: 'label',
    title: i18n.intl.formatMessage({
      id: 'key0047',
      defaultMessage: '日志状态标签',
    }),
    render: (label: string, r: StatusResponse) => (
      <span style={{ color: r.color }}>{label}</span>
    ),
  },
  {
    dataIndex: 'matchers',
    title: i18n.intl.formatMessage({
      id: 'key0048',
      defaultMessage: '日志状态匹配规则',
    }),
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
    title: i18n.intl.formatMessage({
      id: 'key0049',
      defaultMessage: '当前状态是否清除之前日志',
    }),
    render: (val: boolean) =>
      val
        ? i18n.intl.formatMessage({
            id: 'key0018',
            defaultMessage: '清除日志',
          })
        : i18n.intl.formatMessage({
            id: 'key0050',
            defaultMessage: '不清除日志',
          }),
  },
];
type Presets = Required<ColorPickerProps>['presets'][number];

export default function LogStatus() {
  const intl = useIntl();

  const { data, mutate, isLoading } =
    useAppSwr<StatusResponse[]>(statusApiBase);

  const [form] = Form.useForm<StatusCreatedOrUpdated>();

  const [showForm, setShowForm] = useState(false);

  const columns = useStatusColumns();
  const genPresets = (presets = presetPalettes) =>
    Object.entries(presets).map<Presets>(([label, colors]) => ({
      label,
      colors,
    }));

  const { token } = theme.useToken();

  const presets = genPresets({
    primary: generate(token.colorPrimary),
    red,
    green,
    blue,
  });

  return (
    <div>
      <div className="flex justify-center items-center h-8 ">
        <h2 className="mr-auto">
          <FormattedMessage id="key0051" defaultMessage="日志状态管理" />
        </h2>
        <Tooltip
          title={intl.formatMessage({
            id: 'key0052',
            defaultMessage: '增加日志状态',
          })}
          placement="leftBottom"
        >
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
            ...columns,
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
                  <Tooltip
                    title={intl.formatMessage({
                      id: 'key0053',
                      defaultMessage: '删除日志状态配置',
                    })}
                  >
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
          label={intl.formatMessage({
            id: 'key0054',
            defaultMessage: '匹配规则',
          })}
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
                  return Promise.reject(
                    new Error(
                      intl.formatMessage({
                        id: 'key0055',
                        defaultMessage: '不是有效的正则表达式',
                      }),
                    ),
                  );
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
        <Form.Item
          name="name"
          label={intl.formatMessage({
            id: 'key0056',
            defaultMessage: '名称',
          })}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="label"
          label={intl.formatMessage({
            id: 'key0057',
            defaultMessage: '标签名',
          })}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="color"
          label={intl.formatMessage({
            id: 'key0058',
            defaultMessage: '标签颜色',
          })}
          getValueFromEvent={(color: Color) => color.toHexString()}
        >
          <ColorPicker presets={presets} />
        </Form.Item>
        <Form.Item
          name="clear"
          label={intl.formatMessage({
            id: 'key0059',
            defaultMessage: '是否清除之前日志',
          })}
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
      </Modal>
    </div>
  );
}
