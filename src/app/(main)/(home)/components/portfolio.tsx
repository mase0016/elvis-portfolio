import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { toChildrenScrollIn } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { Project } from '@/lib/projects';
import PortfolioProject from './portfolio-project';

/**
 * Props for the {@link Portfolio} component.
 * @interface PortfolioProps
 */
interface PortfolioProps {
  /** An array of featured projects to display. */
  projects: Project[];
}

/**
 * Type definition for a navigation timeline function.
 * @typedef {function(number, number): gsap.core.Timeline} NavTimelineFn
 * @param {number} fromIndex - The starting index for the navigation.
 * @param {number} toIndex - The target index for the navigation.
 */
export type NavTimelineFn = (fromIndex: number, toIndex: number) => gsap.core.Timeline;

/**
 * Renders the Portfolio section, showcasing featured projects.
 *
 * @param {object} props - The properties for the component.
 * @returns {JSX.Element} The rendered Portfolio section.
 */
const Portfolio = ({ projects }: PortfolioProps) => {
  const ref = useRef<HTMLElement>(null);

  // Enter animation
  useGSAP(
    () => {
      toChildrenScrollIn(ref.current?.querySelector('[data-title]'), '[data-title-item]');
    },
    { scope: ref },
  );

  return (
    <section id="work" ref={ref}>
      <div className={cn('py-8 xl:py-20 border-t border-gray-200')}>
        <div className={cn('section-container', 'lg:grid grid-cols-4 gap-4 space-y-2')} data-title>
          <p className="section-desc" data-title-item>
            Portfolio
          </p>

          <div className={cn('col-span-2', 'max-w-xs lg:max-w-sm', 'space-y-2')}>
            <h2 className={cn('section-subtitle', 'p-name')} data-title-item>
              Selected Works
            </h2>
            <p className={cn('section-desc')} data-title-item>
              Design and development work, from user research to live, coded products
            </p>
          </div>
        </div>
      </div>

      {projects.map((project, i) => (
        <PortfolioProject
          key={project.slug}
          project={project}
          number={i + 1}
          total={projects.length}
        />
      ))}
    </section>
  );
};

export default Portfolio;
