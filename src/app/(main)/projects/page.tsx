import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { getAllTags, getPaginatedProjects, ProjectTagData } from '@/lib/projects';
import View from './components/view';

export const metadata: Metadata = {
  title: `Work | ${siteConfig.name}`,
  description: 'Work samples from academic, freelance, and personal projects.',
};

/**
 * @function ProjectsPage
 * @description An asynchronous React functional component that fetches paginated project data and renders the View component.
 * @returns {Promise<JSX.Element>} A promise that resolves to the rendered View component.
 */
export default async function ProjectsPage() {
  const perPage = 5;
  const data = await getPaginatedProjects(1, perPage);
  const tags: ProjectTagData[] = await getAllTags();

  return <View perPage={perPage} tags={tags} {...data} />;
}
