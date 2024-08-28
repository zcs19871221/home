import { FolderOpenOutlined } from '@ant-design/icons';
import { Tooltip, Button } from 'antd';
import { jsonFetcher } from './fetcher.tsx';

export default function VscodeOpener({ command }: { command?: string }) {
  return (
    <Tooltip title="打开目录">
      <Button
        type="text"
        onClick={() => {
          jsonFetcher(
            `/system/run?command=${encodeURIComponent(`code ${command}`)}`,
            'GET',
          );
        }}
      >
        <FolderOpenOutlined />
      </Button>
    </Tooltip>
  );
}
