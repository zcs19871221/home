import useSWR from 'swr';
import { Project } from './types';
import { base } from '.';

export const useNpmProjects = () =>
	useSWR<Project[]>(`${base}/api/npmProjects`);
