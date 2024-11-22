import { Card } from '@mui/material';
import { styled } from '@mui/system';

export const ImageCard = styled(Card)(({ image }) => ({
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
    src: '/images/season_deals.jpg',
    text: 'SEASON DEALS',
    col: 'wheat',
    bgcol: null,
  },
  {
    src: '/images/top_picks.jpg',
    text: 'TOP PICKS',
    col: null,
    bgcol: '#606060',
  },
  {
    src: '/images/for_you.jpg',
    text: 'FOR YOU',
    col: 'white',
    bgcol: 'darkslategrey',
  },
];