import { ConfigProvider, Layout, Menu } from 'antd';
import { ProjectOutlined, CloudServerOutlined } from '@ant-design/icons';
import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { SWRConfig } from 'swr';

import './index.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';

export type AvailableLocale = 'zh-CN' | 'en-US';

const fetcher = (url: string) =>
  fetch(url).then((r) => r.json().then((d) => d.data));

const NpmProject = lazy(() => import('./npmProject/index.tsx'));

const NodeServer = lazy(() => import('./nodeServer/index.tsx'));

export const App = () => {
  const navigate = useNavigate();
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: true,
        revalidateOnMount: true,
        revalidateOnReconnect: true,
        revalidateIfStale: false,
      }}
    >
      <ConfigProvider
        locale={{ locale: 'en-us' }}
        theme={{
          token: {
            // Seed Token
            colorPrimary: '#7939cb',
            borderRadius: 2,
            fontSize: 16,
          },
        }}
      >
        <Layout style={{ minHeight: '100vh' }}>
          <Header className="text-white flex items-center">
            <div>前端管理系统</div>
            <div className="ml-auto cursor-pointer">关闭系统</div>
          </Header>
          <Layout>
            <Sider>
              <Menu
                mode="inline"
                onClick={(item) => {
                  navigate(item.key);
                }}
                items={[
                  {
                    key: 'project',
                    label: '项目',
                    icon: <ProjectOutlined />,
                  },
                  {
                    key: 'server',
                    label: '服务',
                    icon: <CloudServerOutlined />,
                  },
                ]}
              />
            </Sider>
            <Layout>
              <Content>
                <Suspense fallback={<div>loading</div>}>
                  <div className="ml-4 mr-4">
                    <Routes>
                      <Route path="/project" element={<NpmProject />} />
                      <Route path="/server" element={<NodeServer />} />
                    </Routes>
                  </div>
                </Suspense>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </ConfigProvider>
    </SWRConfig>
  );
};

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
