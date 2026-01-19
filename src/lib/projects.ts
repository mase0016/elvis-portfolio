import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { Metadata } from 'next';
import { compileMDX } from 'next-mdx-remote/rsc';
import { components } from '@/components/mdx';

// ... (Keep your existing Project and ProjectImage interfaces here)

const projectsDirectory = path.join(process.cwd(), 'content', 'projects');
let cachedProjects: Project[] | null = null;

/**
 * Gets all projects directly from the filesystem.
 * This is safe for 'output: export' because it runs at build time.
 */
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
    console.error('Build Error: Ensure content/projects exists', error);
    return [];
  }
}

/**
 * Featured projects for the home page.
 */
export async function getFeaturedProjects() {
  const allProjects = await getAllProjects();
  return allProjects.filter((project) => project.data.featured) || [];
}

/**
 * Paginated projects for the work page.
 */
export async function getPaginatedProjects(page: number, projectsPerPage: number, tag?: string) {
  const allProjects = await getAllProjects();
  let filtered = allProjects;

  if (tag) {
    filtered = allProjects.filter((p) => p.data.tags?.includes(tag));
  }

  const startIndex = (page - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const projects = filtered.slice(startIndex, endIndex);

  return {
    projects: projects || [],
    hasNextPage: endIndex < filtered.length,
    hasPrevPage: page > 1,
    total: filtered.length,
  };
}

// ... (You can safely keep getProjectContent, getPrevNextProjects, and getAllTags below)
