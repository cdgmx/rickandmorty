import { styled } from '@mui/system';
import { Card } from '@mui/material';
import { SxProps, Theme } from '@mui/system';

export const StyledCard = styled(Card)(({ theme }) => ({
  overflow: 'hidden',
  '&:hover .MuiCardMedia-root': {
    transform: 'scale(1.1)',
  },
}));

// Global Constants
export const MAX_CARD_WIDTH = 200;
export const TRANSITION_DURATION_SHORT = '1s';
export const TRANSITION_DURATION_LONG = '1s';

export const cardStyles: SxProps<Theme> = {
  maxWidth: MAX_CARD_WIDTH,
};

export const cardMediaStyles: SxProps<Theme> = {
  transition: 'transform 0.3s',
  width: '100%',
  objectFit: 'cover',
};

export const cardContentStyles: SxProps<Theme> = {
  overflow: 'hidden',
};

export const titleTypographyStyles: SxProps<Theme> = {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

export const dialogImageStyles: SxProps<Theme> = {
  width: '100%',
};
