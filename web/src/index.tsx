import { ConfigProvider, Layout } from 'antd';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { SWRConfig } from 'swr';

import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import NodeServerManagement from './nodeServerManagement/index.tsx';

export type AvailableLocale = 'zh-CN' | 'en-US';

const fetcher = (url: string) =>
  fetch(url).then((r) => r.json().then((d) => d.data));

export const App = () => (
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
        {/* <Sider>
              <Menu
                mode="inline"
                onClick={(item) => {
                  navigate(item.key);
                }}
              >
                <Menu.Item key="/se">施耐德</Menu.Item>
              </Menu>
            </Sider> */}
        <Layout>
          <Content>
            <Routes>
              <Route
                path="/nodeServerManagement"
                element={<NodeServerManagement />}
              />
              <Route
                path="*"
                element={<Navigate to="/nodeServerManagement" />}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  </SWRConfig>
);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
