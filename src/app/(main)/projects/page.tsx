import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { getAllProjects, getAllTags, ProjectTagData } from '@/lib/projects';
import View from './components/view';

export const metadata: Metadata = {
  title: `Work | ${siteConfig.name}`,
  description: 'Explore the history of my professional and personal projects',
};

/**
 * @function ProjectsPage
 * @description An asynchronous React functional component that fetches all project data and renders the View component.
 * @returns {Promise<JSX.Element>} A promise that resolves to the rendered View component.
 */
export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const tags: ProjectTagData[] = await getAllTags();

  return <View projects={projects} tags={tags} />;
}
