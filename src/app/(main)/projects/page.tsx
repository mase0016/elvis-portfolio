import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { getAllTags, getPaginatedProjects, ProjectTagData } from '@/lib/projects';
import View from './components/view';

export const metadata: Metadata = {
  title: `Work | ${siteConfig.name}`,
  description: 'Explore the history of my professional and personal projects',
};

export default async function ProjectsPage() {
  const perPage = 5;
  const data = await getPaginatedProjects(1, perPage);
  const tags: ProjectTagData[] = await getAllTags();

  // CRITICAL GUARD: Prevents the "not iterable" crash
  if (!data || !Array.isArray(data.projects)) {
    return (
      <div className="container py-20 text-center">
        <p>No projects found. Please check your content/projects folder.</p>
      </div>
    );
  }

  return <View perPage={perPage} tags={tags} {...data} />;
}
