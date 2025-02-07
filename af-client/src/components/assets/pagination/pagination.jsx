import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const Pagination = styled(Box)({
  position: 'absolute',
  bottom: '10px',
  right: '10px',
  display: 'flex',
  gap: '8px',
});

export const Dot = styled('div')(({ isActive }) => ({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  border: '0.1px solid forestgreen',
  backgroundColor: isActive ? 'gold' : 'lightgray',
}));