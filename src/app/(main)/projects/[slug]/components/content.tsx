import { toScrollIn } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

interface ContentProps {
  children: React.ReactNode;
}
const Content = ({ children }: ContentProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    for (const $el of ref.current?.children || []) {
      if (($el as HTMLElement).dataset.noAnimation) continue;
      toScrollIn($el as HTMLElement);
    }
  });

  return (
    <div
      className={cn(
        'prose',
        'prose-headings:font-medium',
        'prose-a:font-normal',
        'prose-strong:font-medium',
        'e-content',
      )}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default Content;
