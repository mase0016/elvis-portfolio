import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import AboutExperience from './about-experience';
import AboutSkills from './about-skills';
import AboutStats from './about-stats';
import { toChildrenScrollIn } from '@/lib/gsap';

const About = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      toChildrenScrollIn(ref.current?.querySelector('[data-intro]'));
    },
    { scope: ref },
  );

  return (
    <section id="about" className={cn('divide-y divide-gray-100', 'overflow-hidden')} ref={ref}>
      <div className="py-8 xl:py-20">
        <div className="section-container">
          <div className={cn('max-w-none space-y-2')} data-intro>
            <h2 className="section-desc text-gray-500">Who am I?</h2>
            <p className="text-xl font-medium text-gray-800">
              I&apos;m a UX/UI Designer with a front-end development background, currently finishing
              my Interactive Media Design diploma at Algonquin College with a 4.0 GPA and a place on
              the Dean&apos;s Honours List. I bridge the gap between aesthetic design and functional
              development, with expertise spanning UX/UI design, responsive web development, CMS
              platforms (WordPress, Drupal, Shopify, PHP), and professional media production.
              <br />
              With a background in freelance digital graphics and photo/videography, I thrive in
              collaborative environments solving real problems for real users. I am now seeking a
              full-time role as a UX/UI Designer, where I can apply my technical proficiency in
              Figma, the Adobe Creative Suite, and responsive web design to build user-centric
              digital products for a dynamic creative team. My background in front-end development
              gives me a practical understanding of what&apos;s feasible to build, letting me design
              interfaces that are both thoughtful and implementation-ready.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Main wrapper with padding and centering */}
      <div className="py-12 xl:py-24 flex justify-center">
        {/* 2. Container that limits width so it doesn't stretch too far on wide monitors */}
        <div className="w-full max-w-5xl px-6">
          {/* 3. Balanced 2-column grid for Desktop, stacks for Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Column 1: Key Highlights (GPA & Leadership) */}
            <div className="space-y-10">
              <h3 className="text-2xl font-bold border-b pb-4 text-gray-900">Key Highlights</h3>
              <AboutStats />
            </div>

            {/* Column 2: Professional Journey */}
            <div className="space-y-10">
              <h3 className="text-2xl font-bold border-b pb-4 text-gray-900">
                Professional Experience
              </h3>
              <AboutExperience />
            </div>
          </div>
        </div>
      </div>
      <AboutSkills className="py-8 xl:py-20" />
    </section>
  );
};

export default About;
