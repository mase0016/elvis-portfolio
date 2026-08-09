'use client';

import { ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * @interface PhoneEmbedProps
 */
interface PhoneEmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The URL of the live, interactive prototype to embed (e.g. a published Figma Make / figma.site link). */
  src: string;
  /** Caption shown below the phone frame. */
  caption?: string;
  /** Background color behind the phone frame. */
  bg?: string;
}

/**
 * PhoneEmbed component for displaying a live, interactive web prototype
 * inside an iPhone-style frame with a Dynamic Island notch.
 *
 * The embedded prototype is fully interactive - visitors can tap and
 * navigate through it directly inside the frame.
 *
 * @param {PhoneEmbedProps} props - The properties for the PhoneEmbed component.
 * @returns {JSX.Element} A phone-framed iframe embed with a loading state and fallback link.
 */
const PhoneEmbed = ({ src, caption, bg = '#1E3F20', className, ...props }: PhoneEmbedProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn('w-full', 'not-prose', 'flex flex-col items-center gap-6', className)}
      {...props}
    >
      <div
        className={cn('relative', 'w-full flex justify-center', 'py-12 lg:py-20', 'rounded-3xl')}
        style={{ backgroundColor: bg }}
      >
        {/* Phone frame */}
        <div
          className={cn(
            'relative',
            'w-[300px] h-[612px] lg:w-[340px] lg:h-[694px]',
            'rounded-[3rem] lg:rounded-[3.25rem]',
            'bg-black',
            'p-[14px]',
            'shadow-2xl shadow-black/40',
          )}
        >
          {/* Side buttons */}
          <div className="absolute -left-[2px] top-[120px] h-8 w-[3px] rounded-l-sm bg-black/80" />
          <div className="absolute -left-[2px] top-[160px] h-14 w-[3px] rounded-l-sm bg-black/80" />
          <div className="absolute -left-[2px] top-[220px] h-14 w-[3px] rounded-l-sm bg-black/80" />
          <div className="absolute -right-[2px] top-[180px] h-20 w-[3px] rounded-r-sm bg-black/80" />

          {/* Screen */}
          <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] lg:rounded-[2.5rem] bg-white">
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
              </div>
            )}

            <iframe
              src={src}
              title={caption ?? 'Interactive prototype'}
              className={cn(
                'h-full w-full border-0',
                'transition-opacity duration-500',
                loaded ? 'opacity-100' : 'opacity-0',
              )}
              onLoad={() => setLoaded(true)}
              allow="clipboard-write"
            />

            {/* Dynamic Island */}
            <div className="pointer-events-none absolute left-1/2 top-[10px] h-[26px] w-[90px] -translate-x-1/2 rounded-full bg-black" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        {caption && <p className="text-sm text-gray-500 max-w-md">{caption}</p>}
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex items-center gap-2',
            'text-sm font-medium',
            'text-gray-800 hover:text-gray-600',
            'underline underline-offset-4',
          )}
        >
          Open live prototype
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default PhoneEmbed;
