import ScrollFill, { type ScrollFillProps } from '@/components/ui/scroll-fill';
import AboutStat from './about-stat';

const AboutStats = (props: Omit<ScrollFillProps, 'renderContent'>) => {
  return (
    <ScrollFill
      {...props}
      renderContent={({ isActive }) => (
        <div className="flex flex-col gap-20 items-center">
          <AboutStat number={3.8} desc="Grade Point Average" isActive={isActive} hidePlus />
          <AboutStat
            number={15}
            desc="Projects Delivered (school, freelance and personal)"
            isActive={isActive}
          />
          <AboutStat number={60} desc="Students Represented" isActive={isActive} />
        </div>
      )}
    />
  );
};

export default AboutStats;
