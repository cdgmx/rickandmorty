import React, { useRef, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import { Card, CardMedia } from '@mui/material';

type MovingCharacterCardProps = {
  image?: string;
};

const AnimatedCard = animated(Card);

const INIT_TRANSFORM =
  'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
const INIT_BOX_SHADOW = '0px 10px 20px rgba(0,0,0,0.2)';
const HOVER_BOX_SHADOW = '0px 15px 30px rgba(0,0,0,0.3)';
const SPRING_CONFIG = { mass: 5, tension: 350, friction: 40 };

export default function MovingCharacterCard({
  image,
}: MovingCharacterCardProps) {
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  const [springProps, setSpringProps] = useSpring(() => ({
    transform: INIT_TRANSFORM,
    boxShadow: INIT_BOX_SHADOW,
    config: SPRING_CONFIG,
  }));

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { clientX, clientY } = event;
      if (!cardContainerRef.current) return;

      const rect = cardContainerRef.current.getBoundingClientRect();
      const [centerX, centerY] = [rect.width / 2, rect.height / 2];
      const [rotateY, rotateX] = [
        (clientX - rect.left - centerX) / centerX,
        -(clientY - rect.top - centerY) / centerY,
      ];

      setSpringProps({
        transform: `perspective(600px) rotateX(${rotateX * 15}deg) rotateY(${
          rotateY * 15
        }deg) scale(1.05)`,
      });
    },
    [setSpringProps],
  );

  return (
    <div
      ref={cardContainerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setSpringProps({ boxShadow: HOVER_BOX_SHADOW })}
      onMouseLeave={() =>
        setSpringProps({
          transform: INIT_TRANSFORM,
          boxShadow: INIT_BOX_SHADOW,
        })
      }
      style={{ padding: '10px' }}
    >
      <AnimatedCard style={springProps}>
        <CardMedia
          component="img"
          alt="Sample Image"
          height="400"
          image={image}
        />
      </AnimatedCard>
    </div>
  );
}
