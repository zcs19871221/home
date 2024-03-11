/* eslint-disable no-control-regex */
import { message } from 'antd';

export const base = 'http://localhost:9981';

export const jsonFetcher = async (
  url: string,
  method: 'POST' | 'PUT' | 'DELETE' | 'GET',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Record<string, any> | string,
) => {
  try {
    const res = await window.fetch(`${base}${url}`, {
      method,
      ...(body && {
        body: typeof body === 'string' ? body : JSON.stringify(body),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (res.status !== 200) {
      throw new Error(data?.data);
    }
    return data.data;
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    message.error((err as any)?.message);
    throw err;
  }
};

export const bufferFetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
  })
    .then((response) => response.text())
    .then((res) =>
      res
        .replace(/\[1m/g, '')
        .replace(/\\x1B/g, '')
        .replace(/\[22m/g, '')
        .replace(/\[32m/g, '')
        .replace(/\[33m/g, '')
        .replace(/\[39m/g, '')
        .replace(//g, '')
        .replace(/(\x00)+/g, '\n'),
    );
