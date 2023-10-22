import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { Episode } from '@/types';

interface EpisodeListProps {
  episodes: Episode[];
}

// Global constants
const LIST_ITEM_MIN_WIDTH = 200;
const HOVER_BACKGROUND_COLOR = 'rgba(0, 0, 0, 0.08)';
const TRANSITION_DURATION = '0.3s';

/**
 * Renders an individual episode item.
 * @param {Episode} episode - The episode data.
 */
const renderEpisode = (episode: Episode) => (
  <ListItem
    key={episode.id}
    sx={{
      alignItems: 'start',
      minWidth: LIST_ITEM_MIN_WIDTH,
      transition: TRANSITION_DURATION,
      '&:hover': {
        backgroundColor: HOVER_BACKGROUND_COLOR,
        transform: 'scale(1.05)',
      },
    }}
  >
    <ListItemText
      primary={episode.name}
      secondary={`Air Date: ${episode.air_date}, Episode Code: ${episode.episode}`}
    />
  </ListItem>
);

/**
 * @component EpisodeList
 * @description A component to display a list of episodes in a scrollable, horizontal view.
 * @param {Episode[]} episodes - The episodes to display.
 */
const EpisodeList: React.FC<EpisodeListProps> = ({ episodes }) => {
  return (
    <Paper elevation={3}>
      <Box sx={{ display: 'flex', overflowX: 'auto' }}>
        <List
          sx={{
            padding: 2,
            gap: 2,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {episodes.map(renderEpisode)}
        </List>
      </Box>
    </Paper>
  );
};

export default EpisodeList;
