'use client';

import { ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/** The prototype's native design size (iPhone 17 Pro standard screen frame). */
const NATIVE_WIDTH = 402;
const NATIVE_HEIGHT = 874;

/** Polished-titanium base tone approximating the iPhone 17 Pro "Cosmic Orange" finish. */
const FRAME_GRADIENT =
  'linear-gradient(135deg, #E08A4F 0%, #B85E30 25%, #8B3D1F 50%, #B85E30 75%, #E08A4F 100%)';
/**
 * Inset highlight/shadow rings that fake the curvature of a rounded metal
 * edge (bright rim catching light, dark rim where it curves away), layered
 * under a soft outer drop shadow.
 */
const FRAME_SHADOW = [
  'inset 0 0 0 1px rgba(255,255,255,0.3)',
  'inset 1.5px 1.5px 2px rgba(255,255,255,0.5)',
  'inset -1.5px -1.5px 3px rgba(0,0,0,0.5)',
  '0 30px 60px -15px rgba(0,0,0,0.5)',
  '0 12px 24px -10px rgba(0,0,0,0.35)',
].join(', ');
/** Color-matched button tone (Apple color-matches the buttons to the frame). */
const BUTTON_GRADIENT = 'linear-gradient(90deg, #6B2E13, #B85E30)';

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
  const screenRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ scale: 1, offsetX: 0 });
  const [bgSpan, setBgSpan] = useState<{ marginLeft: number; width: number | string }>({
    marginLeft: 0,
    width: '100%',
  });

  // Renders the prototype at its native design resolution and scales the
  // whole screen down to fit, so the app's own layout never has to reflow
  // or scroll just to be seen inside the smaller phone frame, and nothing
  // (like a bottom nav bar) ever gets cropped off the edge. Whichever axis
  // has leftover space (usually width) gets centered instead of piling up
  // as a gap on one side.
  useEffect(() => {
    const $screen = screenRef.current;
    if (!$screen) return;

    const updateTransform = () => {
      const { width, height } = $screen.getBoundingClientRect();
      const scale = Math.min(width / NATIVE_WIDTH, height / NATIVE_HEIGHT);
      setTransform({ scale, offsetX: (width - NATIVE_WIDTH * scale) / 2 });
    };

    updateTransform();
    const observer = new ResizeObserver(updateTransform);
    observer.observe($screen);
    return () => observer.disconnect();
  }, []);

  // Stretches the background to the true viewport edges. The 100vw/-50vw
  // CSS trick only centers correctly when the surrounding column is itself
  // centered on the page, which isn't the case here (this sits in a grid
  // column with an empty sidebar column next to it), so measure the real
  // offset instead of assuming it. Measuring `wrapperRef` (which never gets
  // the margin/width override applied to it) rather than the background div
  // itself avoids a feedback loop: re-measuring the already-shifted
  // background div would compound the offset on every re-run instead of
  // recomputing it from a stable, untouched reference.
  useEffect(() => {
    const $wrapper = wrapperRef.current;
    if (!$wrapper) return;

    const updateSpan = () => {
      const rect = $wrapper.getBoundingClientRect();
      setBgSpan({ marginLeft: -rect.left, width: window.innerWidth });
    };

    updateSpan();
    window.addEventListener('resize', updateSpan);
    const observer = new ResizeObserver(updateSpan);
    observer.observe($wrapper);
    return () => {
      window.removeEventListener('resize', updateSpan);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn('w-full', 'not-prose', 'flex flex-col items-center gap-6', className)}
      {...props}
    >
      <div
        className={cn('relative', 'self-stretch flex justify-center', 'py-12 lg:py-20')}
        style={{ backgroundColor: bg, marginLeft: bgSpan.marginLeft, width: bgSpan.width }}
      >
        {/* Phone frame: polished titanium edge. Height is tuned so the screen
            area (casing minus the 14px frame + bezel padding on each side)
            matches the prototype's native 402:874 aspect ratio exactly, so
            there's no letterbox gap down the sides once scaled to fit. */}
        <div
          className={cn(
            'relative',
            'w-[300px] h-[619px] lg:w-[340px] lg:h-[706px]',
            'rounded-[3rem] lg:rounded-[3.25rem]',
            'p-[10px]',
          )}
          style={{ background: FRAME_GRADIENT, boxShadow: FRAME_SHADOW }}
        >
          {/* Side buttons: color-matched to the frame */}
          <div
            className="absolute -left-[2px] top-[120px] h-8 w-[3px] rounded-l-sm"
            style={{ background: BUTTON_GRADIENT }}
          />
          <div
            className="absolute -left-[2px] top-[160px] h-14 w-[3px] rounded-l-sm"
            style={{ background: BUTTON_GRADIENT }}
          />
          <div
            className="absolute -left-[2px] top-[220px] h-14 w-[3px] rounded-l-sm"
            style={{ background: BUTTON_GRADIENT }}
          />
          <div
            className="absolute -right-[2px] top-[180px] h-20 w-[3px] rounded-r-sm"
            style={{ background: BUTTON_GRADIENT }}
          />

          {/* Bezel: always black around the display, even on colored frames */}
          <div className="relative h-full w-full rounded-[2.4rem] lg:rounded-[2.65rem] bg-black p-[4px]">
            {/* Screen */}
            <div
              ref={screenRef}
              className="relative h-full w-full overflow-hidden rounded-[2.25rem] lg:rounded-[2.5rem] bg-white"
            >
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-white">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                </div>
              )}

              <iframe
                src={src}
                title={caption ?? 'Interactive prototype'}
                width={NATIVE_WIDTH}
                height={NATIVE_HEIGHT}
                className={cn(
                  'absolute left-0 top-0 border-0',
                  'transition-opacity duration-500',
                  loaded ? 'opacity-100' : 'opacity-0',
                )}
                style={{
                  transform: `translate(${transform.offsetX}px, 0) scale(${transform.scale})`,
                  transformOrigin: 'top left',
                }}
                onLoad={() => setLoaded(true)}
                allow="clipboard-write"
              />

              {/* Dynamic Island */}
              <div className="pointer-events-none absolute left-1/2 top-[10px] h-[26px] w-[90px] -translate-x-1/2 rounded-full bg-black">
                {/* Front camera lens */}
                <div
                  className="absolute right-[9px] top-1/2 h-[8px] w-[8px] -translate-y-1/2 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle at 35% 35%, #4a5a7a 0%, #171b26 45%, #000 100%)',
                  }}
                />
              </div>
            </div>
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
