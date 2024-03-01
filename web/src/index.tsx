import { ConfigProvider, Layout } from 'antd';
import { IntlProvider } from 'react-intl';
import React, { useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { SWRConfig } from 'swr';

import './index.css';
import { create } from 'zustand';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import NodeServerManagement from './nodeServerManagement/index.tsx';

export type AvailableLocale = 'zh-CN' | 'en-US';

const fetcher = (url: string) =>
  fetch(url).then((r) => r.json().then((d) => d.data));

export function importMessages(locale: AvailableLocale) {
  switch (locale) {
    case 'en-US':
      return import('./translations/en-US.json').then((v) => v.default);
    case 'zh-CN':
      return import('./translations/zh-CN.json').then((v) => v.default);
    default:
      return import('./translations/zh-CN.json').then((v) => v.default);
  }
}

type GetPromiseType<C extends Promise<unknown>> =
  C extends Promise<infer T> ? T : unknown;

interface Store {
  locale?: AvailableLocale;
  setLocale: (locale: AvailableLocale) => Promise<void>;
  messages?: GetPromiseType<ReturnType<typeof importMessages>>;
}

export const useAppStore = create<Store>()((set) => ({
  setLocale: async (locale) => {
    const messages = await importMessages(locale);
    set({ locale, messages });
  },
}));

export const App = () => {
  const locale = useAppStore((state) => state.locale);
  const messages = useAppStore((state) => state.messages);
  const setLocale = useAppStore((state) => state.setLocale);
  useLayoutEffect(() => {
    if (!locale) {
      setLocale('zh-CN');
    }
  }, [locale, setLocale]);

  if (!messages || !locale) {
    return null;
  }

  return (
    <IntlProvider locale={locale} messages={messages}>
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
                  <Route path="/">
                    <Route
                      path="/nodeServerManagement"
                      element={<NodeServerManagement />}
                    />
                    <Route
                      path="*"
                      element={<Navigate to="/nodeServerManagement" />}
                    />
                  </Route>
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </ConfigProvider>
      </SWRConfig>
    </IntlProvider>
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
