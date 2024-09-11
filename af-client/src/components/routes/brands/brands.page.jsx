import { BrandContext } from '../../../contexts/brand.context';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

// BrandPage is rendered when a user clicks the `SAA Brand` route
const BrandsPage = () => {
  const { brandsMap } = useContext(BrandContext);

  // scaling: brandsMap can return more brand information for BrandsPage to work with i.e ranking
  return (
    <>
      <div className="card brands-page vh-100">
        <div className="card-title">
          <h2 className="text-center mx-auto bg-ws p-3">
            Sellers As A Brand
          </h2>
        </div>

        <section className="fw" id="brands-page">
          <div className="card-body mx-auto -lg">
            <div className='card p-2'>
              <p>Select a Brand to Patronize</p>
            </div>
            {Object.keys(brandsMap).map((brandName, index) => (
            <Link key={index} to={`/brands/${brandName}`}>
              <div className="m-2 block">
                <div className='p-2 flex-space-bet'>
                  <span className='text-black v-center'>
                    ({index + 1})
                  </span>
                  <Button className='ml-2' variant='info'>
                    {brandName.toUpperCase()} 
                  </Button>
                  <span className='text-success v-center'>
                    verified
                  </span>
                </div>
              </div>
            </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default BrandsPage;
