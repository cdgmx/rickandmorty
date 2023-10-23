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
  gender,
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
    <StyledCard data-testid="card-container">
      <CardActionArea
        data-testid="card-action-area"
        onClick={() => handleCardClick()}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          onClick={event => {
            event.stopPropagation(); // Prevent event from propagating to parent
            setOpen(true);
          }}
          sx={cardMediaStyles}
          data-testid="card-media"
        />
        <CardContent
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={cardContentStyles}
          data-testid="card-content"
        >
          <Link href={`/characters/${id}`}>
            <Typography
              variant="h5"
              component="div"
              sx={titleTypographyStyles}
              ref={textRef}
              data-testid="card-title"
            >
              {title}
            </Typography>
          </Link>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            data-testid="card-secondary-text"
          >
            Species: {secondaryText}
          </Typography>
          <Typography variant="body2" data-testid="card-description">
            Status: {description}
          </Typography>
          <Typography variant="body2" data-testid="card-description">
            Gender: {gender}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        data-testid="card-dialog"
      >
        <DialogContent data-testid="dialog-content">
          <img src={image} alt={title} style={{ width: '100%' }} />
        </DialogContent>
        <DialogActions data-testid="dialog-actions">
          <Button
            onClick={() => setOpen(false)}
            color="primary"
            data-testid="dialog-close-button"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </StyledCard>
  );
};

export default CharacterCard;
