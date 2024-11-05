import React, { useState, useEffect } from 'react';
import { Card, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px',
});

const ImageCard = styled(Card)(({ image }) => ({
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

const CenteredText = styled(Typography)(({ bgCol, col }) => ({
  padding: '20px',
  minWidth: '20%',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  color: col || 'goldenrod',
  fontFamily: 'serif',
  background: bgCol || 'rgba(0, 0, 0, 0.5)',
  textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)',
}));

const Pagination = styled(Box)({
  position: 'absolute',
  bottom: '10px',
  right: '10px',
  display: 'flex',
  gap: '8px',
});

const Dot = styled('div')(({ isActive }) => ({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  border: '1px solid forestgreen',
  backgroundColor: isActive ? 'gold' : 'lightgray',
}));

const IndexImages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1571597438372-540dd352bf41?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      text: 'Season deals',
      col: 'wheat',
      bgCol: null,
    },
    {
      src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      text: 'Top picks',
      col: null,
      bgCol: 'grey',
    },
    {
      src: 'https://images.unsplash.com/photo-1484945658654-c0d94b5de6ac?q=80&w=3471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      text: 'For y🫵🏾u',
      col: null,
      bgCol: null,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

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
