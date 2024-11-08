/*
 * This file is automatic generated by automatic-i18n.
 * All changes will be cleared
 * after rerun automatic-i18n program.
 * Or you can implement an I18nFormatter class and use that class as the I18nFormatterClass parameter for api invoke.
 */
import React, {
  ReactNode,
  useState,
  createContext,
  useContext,
  useMemo,
  useLayoutEffect,
} from 'react';
import {
  IntlProvider,
  IntlShape,
  createIntl,
  createIntlCache,
  IntlCache,
  MessageDescriptor,
  FormattedMessage,
} from 'react-intl';
import type { Props } from 'react-intl/lib/src/components/message.d.ts';

import type { AvailableLocales, LocalKey } from './types';

type AppMessageDescriptor<IDS> = MessageDescriptor & { id?: IDS };
type AppFormatMessageProps<IDS> = Props & { id?: IDS };

type GenericMessageDescription<IDS, T = unknown> = T extends (
  arg: unknown,
) => unknown
  ? Parameters<T> extends [MessageDescriptor, ...infer rest]
    ? (...args: [AppMessageDescriptor<IDS>, ...rest]) => ReturnType<T>
    : T
  : T;

export type AppIntlShape<IDS> = {
  [K in keyof IntlShape]: GenericMessageDescription<IDS, IntlShape[K]>;
};

export interface LocaleContextValue {
  readonly locale: AvailableLocales;
  readonly setLocale: React.Dispatch<React.SetStateAction<AvailableLocales>>;
}

export async function importMessages(
  locale: AvailableLocales,
): Promise<Record<LocalKey, string>> {
  switch (locale) {
    case 'zh-cn':
      return (await import('./zh-cn.ts')).default;

    case 'en-us':
      return (await import('./en-us.ts')).default;

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

class I18n {
  public get locale() {
    return this.currentLocale;
  }

  public get intl(): AppIntlShape<LocalKey> {
    return this.currentIntl;
  }

  public get messages(): Record<LocalKey, string> | null {
    return this.currentMessages;
  }

  public async switch(locale: AvailableLocales) {
    const messages = await importMessages(locale);

    this.currentIntl = createIntl(
      {
        locale,
        messages,
      },
      this.cache,
    );
    this.currentLocale = locale;
    this.currentMessages = messages;
    document.documentElement.lang = locale;

    return messages;
  }

  private currentLocale: AvailableLocales | null = null;

  private cache: IntlCache = createIntlCache();

  private currentIntl: AppIntlShape<LocalKey> = createIntl(
    {
      locale: 'zh-cn',
      messages: {} as unknown as Record<LocalKey, string>,
    },
    this.cache,
  );

  private currentMessages: Record<LocalKey, string> | null = null;
}

export const i18n = new I18n();

export function LocaleProvider({
  children,
  fallback,
  defaultLocale,
}: {
  defaultLocale: AvailableLocales;
  children: ReactNode;
  fallback?: React.ReactNode;
}) {
  const [messages, setMessages] = useState<Record<string, string> | null>(null);
  const [locale, setLocale] = useState(defaultLocale);

  useLayoutEffect(() => {
    async function fetchMessages() {
      const fetchedMessages = await i18n.switch(locale);
      setMessages(fetchedMessages);
    }

    fetchMessages();
  }, [locale]);

  const value = useMemo(
    (): LocaleContextValue => ({
      locale,
      setLocale,
    }),
    [locale],
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

export const AppFormattedMessage = FormattedMessage as React.ComponentType<
  AppFormatMessageProps<LocalKey>
>;
