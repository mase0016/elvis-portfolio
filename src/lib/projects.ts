import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { Metadata } from 'next';
import { compileMDX } from 'next-mdx-remote/rsc';
import { components } from '@/components/mdx';

export interface ProjectImage {
  src: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface Project {
  slug: string;
  data: {
    title: string;
    description?: string;
    date?: string;
    type?: string;
    services?: string[];
    role?: string;
    tags?: string[];
    url?: string;
    image?: ProjectImage;
    color?: string;
    featured?: boolean;
    metadata: Metadata;
    gallery?: ProjectImage[];
  };
  content?: React.ReactElement;
}

export interface ProjectTagData {
  name: string;
  count: number;
}

const projectsDirectory = path.join(process.cwd(), 'content', 'projects');
let cachedProjects: Project[] | null = null;

export async function getProjectContent(slug: string) {
  const filePath = path.join(projectsDirectory, `${slug}.mdx`);
  const fileContent = await fs.readFile(filePath, 'utf8');
  const { content, frontmatter: data } = await compileMDX({
    source: fileContent,
    components,
    options: { parseFrontmatter: true },
  });
  return { slug, content, data } as Project;
}

export async function getAllProjects() {
  if (cachedProjects) return cachedProjects;
  try {
    const files = await fs.readdir(projectsDirectory);
    const projects = await Promise.all(
      files
        .filter((file) => file.endsWith('.mdx'))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, '');
          const filePath = path.join(projectsDirectory, file);
          const fileContent = await fs.readFile(filePath, 'utf8');
          const { data } = matter(fileContent);
          return { slug, data } as Project;
        }),
    );
    projects.sort((a, b) => {
      const dateA = new Date(a.data.date || 0);
      const dateB = new Date(b.data.date || 0);
      return dateB.getTime() - dateA.getTime();
    });
    cachedProjects = projects;
    return projects;
  } catch (error) {
    return [];
  }
}

export async function getPrevNextProjects(currentSlug: string) {
  const allProjects = await getAllProjects();
  const currentIndex = allProjects.findIndex((project) => project.slug === currentSlug);
  let prevProject = null;
  let nextProject = null;
  if (currentIndex > 0) prevProject = allProjects[currentIndex - 1];
  if (currentIndex < allProjects.length - 1) nextProject = allProjects[currentIndex + 1];
  return { prevProject, nextProject };
}

export async function getPaginatedProjects(page: number, projectsPerPage: number, tag?: string) {
  const allProjects = await getAllProjects();
  let filtered = allProjects;
  if (tag) filtered = allProjects.filter((p) => p.data.tags?.includes(tag));
  const startIndex = (page - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const projects = filtered.slice(startIndex, endIndex);

  // Safety: Always return an array for 'projects'
  return {
    projects: projects || [],
    hasNextPage: endIndex < filtered.length,
    hasPrevPage: page > 1,
    total: filtered.length,
  };
}

// Ensure this function appears only ONCE in this file
export async function getFeaturedProjects() {
  const allProjects = await getAllProjects();
  return allProjects.filter((project) => project.data.featured) || [];
}

export async function getAllTags(): Promise<ProjectTagData[]> {
  const allProjects = await getAllProjects();
  const tagCounts: { [key: string]: number } = {};
  allProjects.forEach((project) => {
    project.data.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  return Object.keys(tagCounts)
    .map((tag) => ({ name: tag, count: tagCounts[tag] }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
