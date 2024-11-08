import { BrandContext } from '../../contexts/brand.context';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Card } from '@mui/material';
import { useContext } from 'react';

// BrandPage is rendered when a user clicks the `SAA Brand` route
const BrandsPage = () => {
  const { brandsMap } = useContext(BrandContext);

  // scaling: brandsMap can return more brand information for BrandsPage to work with i.e ranking
  return (
    <>
      <Card className="mt-2 brands-page col-md-6">
        <div className="card-title">
          <h2 className="text-center mx-auto bg-ws p-3">
            Sellers As A Brand
          </h2>
        </div>

        <section id="brands-page">
          <div className="card-body -lg">
            <div className='card mx-auto p-2 fs-smaller col-md-6'>
              <span>Select a brand to patronize</span>
            </div>
            {Object.keys(brandsMap).map((brandName, index) => (
            <Link key={index} to={`/brands/${brandName}`}>
              <div className="m-2 block">
                <div className='p-2 flex-just-cent'>
                  <Button className='ml-2' variant='info'>
                    {brandName.toUpperCase()} 
                  </Button>
                </div>
              </div>
            </Link>
            ))}
          </div>
        </section>
      </Card>
    </>
  );
};

export default BrandsPage;
