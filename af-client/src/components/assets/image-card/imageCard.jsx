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