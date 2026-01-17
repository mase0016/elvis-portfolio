import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { toChildrenScrollIn } from '@/lib/gsap';
import { cn } from '@/lib/utils';

/**
 * Array of professional experience objects
 * @type {Array<{from: string, to: string, title: string, company: string}>}
 */
const experiences = [
  {
    from: 'Jan 2023',
    to: 'Present',
    title: 'Digital Graphics Designer',
    company: 'Freelance',
  },
  {
    from: 'Feb 2024',
    to: 'Present',
    title: 'Photographer and Videographer/Video Producer',
    company: 'Freelance',
  },
  {
    from: 'Nov 2024',
    to: 'Present',
    title: 'Front-end Developer/Designer',
    company: 'School $ Personal projects/Freelance',
  },
  {
    from: 'Jan 2025',
    to: 'Present',
    title: 'UX/UI Designer',
    company: 'School $ Personal projects',
  },
  {
    from: 'Jan 2025',
    to: 'Present',
    title: 'Content Management System (CMS) Developer/Designer',
    company: 'School $ Personal projects',
  },
];

const AboutExperience = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      toChildrenScrollIn(ref.current?.querySelector('[data-experience-title]'));
      toChildrenScrollIn(ref.current?.querySelector('[data-experience-items]'));
    },
    { scope: ref },
  );

  return (
    <div className={cn('w-sm space-y-8')} ref={ref}>
      <div className={cn('space-y-2')} data-experience-title>
        <h3 className="text-xl font-medium text-gray-800">My Journey as a Multimedia Designer/Developer</h3>
        {/* <p className="section-desc text-gray-500">My Journey in Web Design & Development</p> */}
      </div>

      <div className="space-y-4" data-experience-items>
        {experiences.map((experience, i) => (
          <div className={cn('flex gap-8')} key={i}>
            <div className={cn('w-10', 'text-center')}>
              <div className="font-medium text-gray-800">{experience.from}</div>
              <div className="text-gray-500">{experience.to}</div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">{experience.title}</h4>
              <p className="section-desc text-gray-500">{experience.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutExperience;
