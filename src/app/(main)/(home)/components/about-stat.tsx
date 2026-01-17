import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Plus } from 'lucide-react';
import { useId, useRef } from 'react';
import { getTimeline } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import MultilineSlideUp from '@/components/ui/multiline-slide-up';

/**
 * Props for the AboutStat component
 * @extends React.HTMLAttributes<HTMLDivElement>
 */
interface AboutStatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The number to display */
  number: number;
  /** The description text */
  desc: string;
  /** Whether the component an active state */
  isActive?: boolean;
  /** Whether to hide the plus icon */
  hidePlus?: boolean;
}

const AboutStat = ({ number, desc, isActive, hidePlus }: AboutStatProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      });
      const numberTl = getTimeline(`${id}/number`);

      if (numberTl) tl.add(numberTl);
      tl.to('[data-plus]', { opacity: 1, ease: 'none' }, '<0.1');
      tl.to('[data-desc]', { opacity: 1, ease: 'none' }, '<0.1');
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div
        className={cn(
          'flex items-start justify-center', // Flexbox keeps the group centered
          'text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black',
          isActive ? 'text-gray-800' : 'text-gray-200',
        )}
      >
        <MultilineSlideUp timelineName={`${id}/number`}>
          {number < 10 ? number.toFixed(1) : number}
        </MultilineSlideUp>
        
        {!hidePlus && (
          <Plus
            className={cn(
              'opacity-0', 
              'w-6 h-6 md:w-10 md:h-10', // Smaller icon on mobile for better fit
              'mt-2 md:mt-4 ml-1'        // Moves it up like a superscript
            )}
            data-plus
          />
        )}
      </div>
      <p
        className={cn(
          'section-desc text-center',      // Ensures description is centered
          'opacity-0', 
          isActive ? 'text-gray-500' : 'text-gray-200'
        )}
        data-desc
      >
        {desc}
      </p>
    </div>
  );
};

export default AboutStat;