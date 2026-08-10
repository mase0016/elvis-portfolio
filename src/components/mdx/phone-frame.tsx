'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

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
 * @interface PhoneFrameProps
 */
interface PhoneFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The screenshot to display inside the frame. */
  src: string;
  /** The alt text for the screenshot. Defaults to caption if not provided. */
  alt?: string;
  /** Caption shown below the phone frame. */
  caption?: string;
}

/**
 * PhoneFrame component for displaying a static screenshot inside the same
 * iPhone 17 Pro "Cosmic Orange" frame and Dynamic Island used by PhoneEmbed,
 * for screens that aren't a live interactive prototype.
 *
 * @param {PhoneFrameProps} props - The properties for the PhoneFrame component.
 * @returns {JSX.Element} A phone-framed static screenshot with an optional caption.
 */
const PhoneFrame = ({ src, alt, caption, className, ...props }: PhoneFrameProps) => {
  return (
    <div className={cn('not-prose', 'flex flex-col items-center gap-3', className)} {...props}>
      <div
        className={cn(
          'relative',
          'w-[190px] h-[392px] lg:w-[220px] lg:h-[454px]',
          'rounded-[2rem] lg:rounded-[2.25rem]',
          'p-[8px]',
        )}
        style={{ background: FRAME_GRADIENT, boxShadow: FRAME_SHADOW }}
      >
        {/* Side buttons: color-matched to the frame */}
        <div
          className="absolute -left-[1.5px] top-[70px] h-5 w-[2.5px] rounded-l-sm"
          style={{ background: BUTTON_GRADIENT }}
        />
        <div
          className="absolute -left-[1.5px] top-[95px] h-9 w-[2.5px] rounded-l-sm"
          style={{ background: BUTTON_GRADIENT }}
        />
        <div
          className="absolute -left-[1.5px] top-[135px] h-9 w-[2.5px] rounded-l-sm"
          style={{ background: BUTTON_GRADIENT }}
        />
        <div
          className="absolute -right-[1.5px] top-[110px] h-12 w-[2.5px] rounded-r-sm"
          style={{ background: BUTTON_GRADIENT }}
        />

        {/* Bezel: always black around the display, even on colored frames */}
        <div className="relative h-full w-full rounded-[1.6rem] lg:rounded-[1.8rem] bg-black p-[3px]">
          {/* Screen */}
          <div className="relative h-full w-full overflow-hidden rounded-[1.45rem] lg:rounded-[1.65rem] bg-white">
            <Image
              src={src}
              alt={alt ?? caption ?? ''}
              fill
              className="object-cover object-top"
              sizes="220px"
            />

            {/* Dynamic Island */}
            <div className="pointer-events-none absolute left-1/2 top-[7px] h-[16px] w-[56px] -translate-x-1/2 rounded-full bg-black">
              {/* Front camera lens */}
              <div
                className="absolute right-[6px] top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle at 35% 35%, #4a5a7a 0%, #171b26 45%, #000 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {caption && <p className="text-sm text-gray-500 text-center max-w-[220px]">{caption}</p>}
    </div>
  );
};

export default PhoneFrame;
