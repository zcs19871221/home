import { message } from 'antd';

export const base = 'http://localhost:9981';

const request = async (
  url: string,
  method: 'POST' | 'PUT' | 'DELETE' | 'GET',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Record<string, any>,
) => {
  try {
    const res = await window.fetch(`${base}${url}`, {
      method,
      ...(body && { body: JSON.stringify(body) }),
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

export default request;
