import { useMediaQuery, Theme } from '@mui/material';

/**
 * useResponsiveButtonSize
 *
 * Custom hook to get the responsive size for Material-UI buttons.
 *
 * @returns {'small' | 'medium' | 'large'} The button size based on the current screen width.
 */
const useResponsiveButtonSize = (): 'small' | 'medium' | 'large' => {
  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs'),
  );
  const isSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between('sm', 'md'),
  );
  const isMediumUp = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md'),
  );

  let buttonSize: 'small' | 'medium' | 'large' = 'medium'; // default size

  if (isXSmall) {
    buttonSize = 'small';
  } else if (isSmall) {
    buttonSize = 'medium';
  } else if (isMediumUp) {
    buttonSize = 'large';
  }

  return buttonSize;
};

export default useResponsiveButtonSize;
