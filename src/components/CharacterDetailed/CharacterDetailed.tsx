import { Typography, Box, Chip } from '@mui/material';
import { NextRouter, useRouter } from 'next/router';
import { Character } from '@/types';
import EpisodeList from '@/components/EpisodeList';

type CharacterDetailsProps = {
  character: Character;
};

const STATUS_ALIVE = 'Alive';
const STATUS_UKNOWN = 'Unknown';

type ChipColor = 'default' | 'success' | 'warning' | 'error';
type ChipDetail = [string, string, ChipColor, string?]; // added optional link

const determineStatusColor = (status: string): ChipColor => {
  switch (status) {
    case STATUS_ALIVE:
      return 'success';
    case STATUS_UKNOWN:
      return 'warning';
    default:
      return 'error';
  }
};

const handleChipClick = (router: NextRouter, link?: string) => {
  if (link) {
    const [key, value] = link.split('/');
    router.push({
      pathname: '/',
      query: { [key]: value },
    });
  }
};

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character }) => {
  const { name, status, species, gender, origin, location, episode } =
    character;
  const router = useRouter(); // to handle navigation

  const chipDetails: ChipDetail[] = [
    [
      'Status',
      status || '',
      determineStatusColor(status || ''),
      `status/${status}`,
    ],
    ['Species', species || '', 'default', `species/${species}`],
    ['Gender', gender || '', 'default', `gender/${gender}`],
    ['Origin', origin?.name || '', 'default'],
    ['Last Located', location?.name || '', 'default'],
  ];

  const renderChipDetail = ([label, value, color, link]: ChipDetail) => (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', margin: '8px 0' }}
      key={label + value}
    >
      <Typography
        variant="subtitle1"
        color="textPrimary"
        sx={{ marginRight: 1 }}
      >
        {label}:
      </Typography>
      <Chip
        clickable={!!link}
        label={value}
        color={color}
        onClick={() => handleChipClick(router, link)}
      />
    </Box>
  );

  return (
    <Box sx={{ textAlign: 'left', padding: '30px' }}>
      <Typography variant="h2" color="textPrimary" gutterBottom>
        {name}
      </Typography>
      {chipDetails.map(detail => renderChipDetail(detail))}
      <Typography variant="h5" color="textPrimary" gutterBottom>
        Episodes Appearances
      </Typography>
      <EpisodeList episodes={episode} />
    </Box>
  );
};

export default CharacterDetails;
