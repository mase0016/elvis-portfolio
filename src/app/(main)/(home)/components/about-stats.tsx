import ScrollFill, { type ScrollFillProps } from '@/components/ui/scroll-fill';
import AboutStat from './about-stat';

const AboutStats = (props: Omit<ScrollFillProps, 'renderContent'>) => {
  return (
    <ScrollFill
      {...props}
      renderContent={({ isActive }) => (
        <div className="flex flex-col gap-20 items-center">
          <AboutStat number={4.0} desc="Grade Point Average" isActive={isActive} hidePlus />
          <AboutStat number={15} desc="Multi-media Projects Delivered" isActive={isActive} />
          <AboutStat number={60} desc="Students Represented" isActive={isActive} />
        </div>
      )}
    />
  );
};

export default AboutStats;
