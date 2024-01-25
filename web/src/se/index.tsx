import { Button, Form, Input, Modal, Table } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import useSWR from 'swr';

interface LogInfo {
	content: string;
	status: string;
	id: number;
}
interface Project {
	name: string;
	path: string;
	id: number;
	command: string;
	port: number;
}
const base = 'http://localhost:9981';
export const Se = () => {
	const { data: projects } = useSWR<Project[]>(`${base}/api/se/list`);

	const uiServer = projects?.find((p) => p.name.includes('-ui'));
	const bffServer = projects?.find((p) => p.name.includes('-bff'));

	const { data: logs } = useSWR<Record<number, LogInfo>>(
		`${base}/api/se/logs`,
		{
			refreshInterval: 1000,
		},
	);

	const [log, setLog] = useState<LogInfo>();
	const [adding, setAdding] = useState<boolean>(false);
	const showLog = (id?: number) => {
		if (!id) {
			return;
		}
		setLog(logs?.[id]);
	};
	const vscode = (locate: string) => {
		fetch(`/api/se/vscode/${locate}`, { method: 'PUT' });
	};

	const operateServer = (
		operation: 'start' | 'stop' | 'restart',
		id?: number,
	) => {
		if (id === undefined) {
			return;
		}
		fetch(`/api/se/${operation}/${id}`, { method: 'PUT' });
	};

	const [form] = Form.useForm();

	const onOk = () => {
		form.submit();
	};

	return (
		<div>
			<Modal open={log !== undefined}>
				<TextArea value={log?.content} />
			</Modal>
			<Modal open={adding} onCancel={() => setAdding(false)} onOk={onOk}>
				<Form
					form={form}
					layout="vertical"
					name="addProject"
					onFinish={(v) => {
						fetch(`${base}/api/se`, {
							method: 'POST',
							body: JSON.stringify(v),
							headers: {
								'content-type': 'application/json',
							},
						});
					}}
				>
					<Form.Item<Project>
						label="path"
						name="path"
						rules={[{ required: true, message: 'Please input your path!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<Project>
						label="name"
						name="name"
						rules={[{ required: true, message: 'Please input your name!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item<Project>
						label="command"
						name="command"
						rules={[{ required: true, message: 'Please input your command!' }]}
					>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
			<div>
				<Button
					type="primary"
					onClick={() => {
						operateServer('restart', uiServer?.id);
					}}
				>
					重启UI
				</Button>
				<Button
					type="primary"
					onClick={() => {
						operateServer('restart', bffServer?.id);
					}}
				>
					重启BFF
				</Button>
				<Button type="primary" onClick={() => showLog(bffServer?.id)}>
					bff日志
				</Button>
				<Button type="primary" onClick={() => showLog(uiServer?.id)}>
					Ui日志
				</Button>
				<Button
					type="primary"
					onClick={() => {
						form.resetFields();
						setAdding(true);
					}}
				>
					添加项目
				</Button>
			</div>
			<Table
				dataSource={projects}
				columns={[
					{
						dataIndex: 'name',
						title: '名称',
					},
					{
						dataIndex: 'status',
						title: '状态',
						render: (_, record) => {
							return logs?.[record.id]?.status;
						},
					},
					{
						dataIndex: 'operation',
						title: '操作',
						render: (_, record) => {
							return (
								<>
									<Button
										type="primary"
										onClick={() => {
											operateServer('start', record.id);
										}}
									>
										打开
									</Button>
									<Button
										type="primary"
										onClick={() => {
											operateServer('restart', record.id);
										}}
									>
										重启
									</Button>
									<Button
										type="primary"
										onClick={() => {
											showLog(record.id);
										}}
									>
										日志
									</Button>
									<Button
										type="primary"
										onClick={() => {
											vscode(record.path);
										}}
									>
										vscode
									</Button>
								</>
							);
						},
					},
					{
						dataIndex: 'path',
						title: '项目路径',
					},
					{
						dataIndex: 'port',
						title: '端口',
					},
				]}
			/>
		</div>
	);
};
