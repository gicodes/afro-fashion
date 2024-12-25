import './marketplace.styles.scss';

import FilterWidget from './index.widget';
import { Box, Button } from "@mui/material";
import ProductCard from '../products/product-card';
import { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const sortByPricesHighToLow = (products) => {
  return [...products].sort((a, b) => a.price - b.price);
};

const sortByPricesLowToHigh = (products) => {
  return [...products].sort((a, b) => b.price - a.price);
};

const sortByPopularity = (products) => {
  return [...products].sort((a, b) => b.popularity - a.popularity); // Assuming 'popularity' is a numerical property
};

const sortByNewest = (products) => {
  return [...products].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)); // Assuming 'dateAdded' is in a date string format
};

// AF Marketplace is rendered in collections... 
const Collections = () => {
  const itemsPerPage = 5;
  const [filter, setFilter] = useState("Random");
  const [currentPage, setCurrentPage] = useState(1);
  const [ allProducts, setAllProducts ] = useState([]);
  const { categoriesMap } = useContext(CategoriesContext);

  useEffect(() => {
    let productsArray = [];
    Object.values(categoriesMap).forEach((products) => {
      productsArray = [...productsArray, ...products];
    });

    switch (filter) {
      case "Price: Low to High":
        productsArray = sortByPricesHighToLow(productsArray);
        break;
      case "Price: High to Low":
        productsArray = sortByPricesLowToHigh(productsArray);
        break;
      case "Popularity":
        productsArray = sortByPopularity(productsArray);
        break;
      case "Newest":
        productsArray = sortByNewest(productsArray);
        break;
      default:
        productsArray.sort(() => Math.random() - 0.5); // Random shuffle
    }

    setAllProducts(productsArray);
  }, [categoriesMap, filter]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <FilterWidget setFilter={setFilter}/>
      { allProducts?.length > 0 ? (
        <div className="marketplace-route">
          { currentProducts.map((product, index) => (
            <section key={index} id={product.id} className="product-section">
              <ProductCard key={product?.id} product={product} />
              <br />
            </section>
          ))}
        </div>
      ) : (
        <div className='card p-2'>
          <p className='fs-mid mt-3 text-center'>
            Products are unavailable... Try again later
          </p>
        </div>
      )}

      <div className='pagination'>
        <Box
          sx={{
            gap: "1rem",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant='contained'
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </Button>

          <span className='text-link'> Page {currentPage} of {totalPages} </span>

          <Button
            variant='contained'
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </Button>
        </Box>
        <div className='hide-in-sm lg-div' />
      </div> 
    </>
  );
};

export default Collections;