import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | '3d-up' | '3d-left' | '3d-right';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const getVariants = (direction: string) => {
  switch (direction) {
    case 'up':
      return {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      };
    case 'down':
      return {
        hidden: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0 },
      };
    case 'left':
      return {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
      };
    case 'right':
      return {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
      };
    case 'scale':
      return {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      };
    case '3d-up':
      return {
        hidden: { opacity: 0, y: 60, rotateX: 10, scale: 0.96 },
        visible: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
      };
    case '3d-left':
      return {
        hidden: { opacity: 0, x: 60, rotateY: -10, scale: 0.96 },
        visible: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
      };
    case '3d-right':
      return {
        hidden: { opacity: 0, x: -60, rotateY: 10, scale: 0.96 },
        visible: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
      };
    default:
      return {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      };
  }
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.9,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-40px' });
  const variants = getVariants(direction);
  const is3D = direction.startsWith('3d');

  return (
    <div ref={ref} style={is3D ? { perspective: '1500px' } : undefined} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={is3D ? { transformStyle: 'preserve-3d' } : undefined}
      >
        {children}
      </motion.div>
    </div>
  );
}
