import React from 'react';
import { createRoot } from 'react-dom/client';

import { LocaleProvider, useLocale } from './i18n/index.tsx';

const App = () => {
  const { locale, setLocale, availableLocales } = useLocale();
  const world = '世界';

  return (
    <div>
      <div>
        {availableLocales.map((l) => (
          <button
            onClick={() => {
              setLocale(l);
            }}
          >
            {locale}
          </button>
        ))}
        你好{world}
      </div>
    </div>
  );
};

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocaleProvider defaultLocale="zh-cn">
      <App />
    </LocaleProvider>
  </React.StrictMode>,
);
