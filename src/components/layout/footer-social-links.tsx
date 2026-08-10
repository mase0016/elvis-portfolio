import { Linkedin, Github, FileText } from 'lucide-react';
import FooterSocialLink from './footer-social-link';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { toChildrenScrollIn } from '@/lib/gsap';
import { cn } from '@/lib/utils';

/**
 * Defines the structure for a social media link.
 */
const links = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/elvis-zak-masembe-969699276',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/mase0016',
    icon: Github,
  },
  {
    label: 'Resume',
    href: '/resume.pdf',
    icon: FileText,
  },
];

/**
 * Renders a collection of social media links for the footer.
 *
 * @returns {JSX.Element} The rendered social links component.
 */
const FooterSocialLinks = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      toChildrenScrollIn(ref.current);
    },
    { scope: ref },
  );

  return (
    <div className={cn('flex lg:flex-col gap-4', className)} {...props} ref={ref}>
      {links.map((link) => (
        <FooterSocialLink key={link.href} link={link} className="opacity-0" data-link />
      ))}
    </div>
  );
};

export default FooterSocialLinks;
