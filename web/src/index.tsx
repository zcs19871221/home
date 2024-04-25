import { ConfigProvider, Layout, Spin } from 'antd';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { SWRConfig } from 'swr';

import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import NodeServerManagement from './nodeServerManagement/index.tsx';
import { LocaleProvider, useLocale } from './i18n/index.tsx';

export type AvailableLocale = 'zh-CN' | 'en-US';

const fetcher = (url: string) =>
  fetch(url).then((r) => r.json().then((d) => d.data));

const AntdProvider = () => {
  const { locale, setLocale } = useLocale();

  return (
    <ConfigProvider
      locale={{ locale }}
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#7939cb',
          borderRadius: 2,
          fontSize: 16,
        },
      }}
    >
      <button onClick={() => setLocale('en-us')}>en-us</button>
      <button onClick={() => setLocale('zh-cn')}>zh-cn</button>

      <Layout style={{ minHeight: '100vh' }}>
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
  );
};
export const App = () => (
  <LocaleProvider defaultLocale="zh-cn" fallback={<Spin size="large" />}>
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: true,
        revalidateOnMount: true,
        revalidateOnReconnect: true,
        revalidateIfStale: false,
      }}
    >
      <AntdProvider />
    </SWRConfig>
  </LocaleProvider>
);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
