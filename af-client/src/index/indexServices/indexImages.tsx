import { ImageCard, images } from '../../components/assets/image-card/imageCard.tsx';
import { Pagination, Dot } from '../../components/assets/pagination/pagination'
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '0 5px 0 5px',
  flexDirection: 'column',
  justifyContent: 'center',
});

interface CenteredTextProps {
  bgcol?: string | null;
  col?: string | null;
}

const CenteredText = styled(Typography)<CenteredTextProps>(({ bgcol, col }) => ({
  padding: '18px',
  minWidth: '18%',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  color: col || 'goldenrod',
  fontFamily: 'serif',
  background: bgcol || 'rgba(0, 0, 0, 0.6)',
  textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)',
}));

const IndexImages: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <ImageCard image={images[currentIndex].src}>
        <CenteredText bgcol={images[currentIndex].bgcol} col={images[currentIndex].col}>
          {images[currentIndex].text}
        </CenteredText>
        <Pagination>
          {images.map((_, index) => (
            <Dot isActive={index === currentIndex} key={index} />
          ))}
        </Pagination>
      </ImageCard>
    </Container>
  );
};

export default IndexImages;