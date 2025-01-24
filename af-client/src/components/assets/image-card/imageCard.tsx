import { Card } from '@mui/material';
import { styled } from '@mui/system';

interface ImageCardProps {
  image: string;
}

export const ImageCard = styled(Card)<ImageCardProps>(({ image }) => ({
  width: '100%',
  height: '360px',
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: `url(${image})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const images = [
  {
    src: '/images/for_you_3.avif',
    text: 'FOR YOU',
    col: 'silver',
    bgcol: null,
  },
  {
    src: '/images/season_deals.jpg',
    text: 'SEASON DEALS',
    col: 'wheat',
    bgcol: null,
  },
  {
    src: '/images/top_picks.jpg',
    text: 'TOP PICKS',
    col: 'burlywood',
    bgcol: null,
  },
];