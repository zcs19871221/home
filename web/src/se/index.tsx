import { Button, Table } from 'antd';
import useSWR from 'swr';

export const Se = () => {
	const { data: datas } =
		useSWR<{ name: string; status: string; path: string; port: string }[]>(
			'/api/datas',
		);

	return (
		<div>
			<div>
				<Button type="primary">重启全部bff</Button>
				<Button type="primary">重启全部ui</Button>
				<Button type="primary">bff日志</Button>
				<Button type="primary">Ui日志</Button>
				<Button type="primary">添加项目</Button>
			</div>
			<Table
				dataSource={datas}
				columns={[
					{
						dataIndex: 'name',
						title: '名称',
					},
					{
						dataIndex: 'status',
						title: '状态',
					},
					{
						dataIndex: 'operation',
						title: '操作',
						render: () => {
							return (
								<>
									<Button type="primary">打开</Button>
									<Button type="primary">关闭</Button>
									<Button type="primary">重启</Button>
									<Button type="primary">api</Button>
								</>
							);
						},
					},
					{
						dataIndex: 'logs',
						title: '日志',
						render: () => {
							return (
								<>
									<Button type="primary">消息</Button>
									<Button type="primary">错误</Button>
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
