import { BrandContext } from '../../contexts/brand.context';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {  
  Button,
  Card, 
  CardMedia, 
  CardContent,
  Grid,
  Rating,  
  Typography, 
} from '@mui/material';
import { blankAvi } from '../dashboard/index/dash-assets';
import { getSellerInfo } from '../../utils/firebase.utils';

import './brands.styles.scss';

// BrandPage is rendered when a user clicks the Seller Hub route
const BrandsPage = () => {
  // Scaling Tip: Introduce Pagination for large data set

  const { brandItemsMap } = useContext(BrandContext);
  const [brandDetails, setBrandDetails] = useState({});

  useEffect(() => {
    const fetchBrandDetails = async () => {
      const details = {};
      for (const brandName of Object.keys(brandItemsMap)) {
        details[brandName] = await getSellerInfo(brandName);
      }
      setBrandDetails(details);
    };

    fetchBrandDetails();
  }, [brandItemsMap]);

  return (
    <div className="brands-page-container">
      <div className="text-center mx-auto bg-ws p-3 mb-2">
        <h2> Sellers As A Brand </h2>        
        <span className='fs-smaller'> Discover and connect with the best local vendors</span>
      </div>

      <Grid container spacing={3} justifyContent="center">
        { 
          Object.keys(brandItemsMap).map((brandName, index) => {
          const brandInfo = brandDetails[brandName];
          const createdAt = brandInfo?.createdAt?.toDate();
          const formattedDate = createdAt ? new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(createdAt): 'N/A';

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="p-2">
                <CardMedia
                  height="120"
                  component="img"
                  className='vh-auto'
                  alt={`${brandName} logo`}
                  image={brandInfo?.imageUrl || blankAvi}
                />
                <CardContent>
                  <Typography variant="subtitle1" component="div" gutterBottom>
                    <b>{brandName.toUpperCase()}</b>
                  </Typography>

                  { brandInfo ? (
                    <Rating
                      name={`${brandName}-rating`}
                      value={brandInfo.rating || 3}
                      precision={0.5}
                      readOnly
                      size='small'
                    />
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Loading...
                      </Typography>
                  )}
                  
                  <Typography variant="body2" fontSize={'smaller'} color="textSecondary">
                    Joined: {formattedDate || 'N/A'}
                  </Typography>
                </CardContent>
                
                <div className="brand-card-actions">
                  <Link to={`/brands/${brandName}`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" fullWidth>
                      View Seller Brand
                    </Button>
                  </Link>
                </div>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default BrandsPage;
