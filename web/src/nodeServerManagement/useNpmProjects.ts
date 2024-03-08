import useSWR from 'swr';
import { Project } from './types.ts';

export const base = 'http://localhost:9981';

const useNpmProjects = () =>
  useSWR<Project[]>(`${base}/api/npmProjects`, {
    revalidateIfStale: false,
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

export default useNpmProjects;
