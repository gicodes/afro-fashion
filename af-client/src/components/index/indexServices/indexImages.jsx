import { Pagination,  Dot } from '../../assets/pagination/pagination';
import { ImageCard, images } from '../../assets/image-card/imageCard';
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 5px 0 5px',
});

const CenteredText = styled(Typography)(({ bgCol, col }) => ({
  padding: '18px',
  minWidth: '18%',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  color: col || 'goldenrod',
  fontFamily: 'serif',
  background: bgCol || 'rgba(0, 0, 0, 0.6)',
  textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)',
}));

const IndexImages = () => {
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
        <CenteredText bgCol={images[currentIndex].bgCol} col={images[currentIndex].col}>
          {images[currentIndex].text}
        </CenteredText>
        
        <Pagination>
          {images.map((_, index) => (
            <Dot key={index} isActive={index === currentIndex} />
          ))}
        </Pagination>
      </ImageCard>
    </Container>
  );
};

export default IndexImages;