import { ConfigProvider, Layout, Menu, message } from 'antd';
import { ProjectOutlined, CloudServerOutlined } from '@ant-design/icons';
import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { SWRConfig } from 'swr';

import './index.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { jsonFetcher } from './common/fetcher.tsx';

export type AvailableLocale = 'zh-CN' | 'en-US';

const fetcher = (url: string) =>
  fetch(url).then((r) => r.json().then((d) => d.data));

const Project = lazy(() => import('./projects/index.tsx'));

const Processes = lazy(() => import('./processes/index.tsx'));

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
            <div
              className="ml-auto cursor-pointer"
              onClick={() => {
                jsonFetcher('/system/shutdown', 'PUT').then(() => {
                  message.success('后台服务关闭成功');
                });
              }}
            >
              关闭系统
            </div>
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
                      <Route path="/project" element={<Project />} />
                      <Route path="/server" element={<Processes />} />
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
