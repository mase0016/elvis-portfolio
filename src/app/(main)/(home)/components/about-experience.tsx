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
    title: 'Freelance Digital Designer & Front-End Developer',
    company: 'Ottawa, ON',
    description:
      'Design and build digital assets and web content for schools, startups and local businesses, from brand identities to website layouts, advising clients on UI layout and visual hierarchy.',
  },
  {
    from: 'Jan 2024',
    to: 'Present',
    title: 'Freelance Photographer & Videographer',
    company: 'Ottawa, ON',
    description:
      "Produce photo and short-form video content for clients' websites and social media campaigns, edited in Lightroom, Premiere Pro, After Effects and Audition.",
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
        <h3 className="text-xl font-medium text-gray-800">
          My Journey as a Multimedia Designer/Developer
        </h3>
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
              {experience.description && (
                <p className="section-desc text-gray-500 mt-2">{experience.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutExperience;
