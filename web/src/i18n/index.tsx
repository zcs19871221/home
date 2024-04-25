import React, {
  ReactNode,
  useState,
  createContext,
  useContext,
  useMemo,
  useLayoutEffect,
} from 'react';
import { IntlProvider } from 'react-intl';

import type { AvailableLocale, LocalKey } from './types.ts';

export interface LocaleContextValue {
  readonly locale: AvailableLocale;
  readonly setLocale: React.Dispatch<React.SetStateAction<AvailableLocale>>;
}

interface LocaleFile {
  default: Record<LocalKey, string>;
}

export function importMessages(locale: AvailableLocale): Promise<LocaleFile> {
  switch (locale) {
    case 'zh-cn':
      return import('./zh-cn.ts') as unknown as Promise<LocaleFile>;
    case 'en-us':
      return import('./en-us.ts') as unknown as Promise<LocaleFile>;
    default: {
      const error: never = locale;
      throw new Error(error);
    }
  }
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);

  if (context === undefined) {
    throw new Error('useLocale must be used within the LocaleProvider context');
  }

  return context;
}

export function LocaleProvider({
  children,
  fallback,
  defaultLocale,
}: {
  defaultLocale: AvailableLocale;
  children: ReactNode;
  fallback?: React.ReactNode;
}) {
  const [messages, setMessages] = useState<Record<string, string> | null>(null);
  const [locale, setLocale] = useState(defaultLocale);

  useLayoutEffect(() => {
    let cancelled = false;

    async function fetchMessages() {
      const importedMessages = await importMessages(locale);
      if (!cancelled) {
        setMessages(importedMessages.default);
        document.documentElement.lang = locale;
      }
    }

    fetchMessages();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const value = useMemo(
    (): LocaleContextValue => ({
      locale,
      setLocale,
    }),
    [locale]
  );

  return (
    <LocaleContext.Provider value={value}>
      {messages ? (
        <IntlProvider locale={locale} messages={messages}>
          {children}
        </IntlProvider>
      ) : (
        fallback
      )}
    </LocaleContext.Provider>
  );
}
