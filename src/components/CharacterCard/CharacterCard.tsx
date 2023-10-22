import React, { useState, useRef, useEffect } from 'react';
import {
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  Dialog,
  DialogContent,
  DialogActions,
  Container,
} from '@mui/material';
import { useRouter } from 'next/router';
import { CharacterCardProps } from './CharacterCard.types';
import {
  StyledCard,
  cardStyles,
  cardMediaStyles,
  cardContentStyles,
  titleTypographyStyles,
} from './CharacterCard.styles';
import Link from 'next/link';
// Global Constants
const MAX_CARD_WIDTH = 200;
const TRANSITION_DURATION_SHORT = '1s';
const TRANSITION_DURATION_LONG = '5s';

const CharacterCard: React.FC<CharacterCardProps> = ({
  id,
  image,
  title,
  secondaryText,
  description,
}) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const textRef = useRef<HTMLDivElement>(null); // Added type for ref
  const router = useRouter();

  useEffect(() => {
    if (textRef.current) {
      const textElement = textRef.current;
      const scrollAmount = textElement.scrollWidth - textElement.clientWidth;
      const transformValue = isHovered
        ? `translateX(-${scrollAmount}px)`
        : 'translateX(0)';
      const transitionDuration = isHovered
        ? TRANSITION_DURATION_LONG
        : TRANSITION_DURATION_SHORT;

      textElement.style.transform = transformValue;
      textElement.style.transition = `transform ${transitionDuration} linear`;
    }
  }, [isHovered]);

  const handleCardClick = () => {
    router.push(`/characters/${id}`);
  };

  return (
    <StyledCard>
      <CardActionArea onClick={() => handleCardClick()}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          onClick={event => {
            event.stopPropagation(); // Prevent event from propagating to parent
            setOpen(true);
          }}
          sx={cardMediaStyles}
        />
        <CardContent
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={cardContentStyles}
        >
          <Link href={`/characters/${id}`}>
            <Typography
              variant="h5"
              component="div"
              sx={titleTypographyStyles}
              ref={textRef}
            >
              {title}
            </Typography>
          </Link>
          <Typography variant="subtitle1" color="textSecondary">
            {secondaryText}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </CardActionArea>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <img src={image} alt={title} style={{ width: '100%' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </StyledCard>
  );
};

export default CharacterCard;
