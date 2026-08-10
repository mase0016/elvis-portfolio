'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { getTimeline } from '@/lib/gsap';
import { type Project, type ProjectTagData } from '@/lib/projects';
import { useEffect, useMemo } from 'react';
import { useAppContext } from '@/context/app-context';
import Hero from './hero';
import Intro from './intro';
import Projects from './projects';
import Filter from './filter';

/**
 * @interface ViewProps
 * @description Props for the View component.
 */
interface ViewProps {
  /** All project data. */
  projects: Project[];
  /** An array of unique tags associated with all projects, including their counts. */
  tags: ProjectTagData[];
}

/**
 * @function View
 * @description A React functional component that displays the full list of projects, filterable by tag.
 * @param {ViewProps} props - The props for the View component.
 * @returns {JSX.Element} The rendered View component.
 */
const View = ({ projects: allProjects, tags }: ViewProps) => {
  const { isLoading, projectFilter } = useAppContext();
  const projects = useMemo(
    () =>
      projectFilter.tag
        ? allProjects.filter((project) => project.data.tags?.includes(projectFilter.tag as string))
        : allProjects,
    [allProjects, projectFilter.tag],
  );

  useGSAP(() => {
    const tl = gsap.timeline({ paused: isLoading });
    const layoutHeaderTl = getTimeline('layout/header');
    const homeHeroTl = getTimeline('projects/hero');

    if (layoutHeaderTl) tl.add(layoutHeaderTl);
    if (homeHeroTl) tl.add(homeHeroTl, '<0.1');
  }, [isLoading]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [projects]);

  return (
    <main className="h-feed">
      <Hero />
      <Intro withFilter={tags.length > 0} />
      <Projects projects={projects} total={projects.length} />
      {tags.length > 0 && <Filter tags={tags} />}
    </main>
  );
};

export default View;
