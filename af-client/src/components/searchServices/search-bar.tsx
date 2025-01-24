import React from 'react';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useLoading } from '../../contexts/loading.context.tsx';
import BrandContext from '../../contexts/brand.context.tsx';
import { FormControl, InputGroup, ListGroup } from 'react-bootstrap';

import './search.styles.scss';

interface SearchBarProps {
  searchSx: string | null;
  resultSx: string | null;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchSx, resultSx }) => {
  const [search, setSearch] = useState('');
  const [searchBox, setSearchBox] = useState(false);
  const { showLoading, hideLoading } = useLoading();  
  const { searchItemsByBrand } = useContext(BrandContext) || {};
  interface BrandObject {
    name: string;
    items: { id: string; name: string }[];
  }
  
  const [aggregatedResult, setAggregatedResult] = useState<BrandObject[]>([]);

  const handleSearch = async (event) => {
    const value = event.target.value;

    setSearch(value);
    setSearchBox(true);

    if (searchItemsByBrand) {
      const brands = await searchItemsByBrand(value);
      if (Array.isArray(brands)) {
        setAggregatedResult(brands.map(brand => ({
          ...brand,
          items: Array.isArray(brand.items) ? brand.items : []
        })));
      } else {
        setAggregatedResult([]);
      }
    }

    if (value === '') setSearchBox(false);
  };

  const handleSearchClick = () => {
    showLoading();
    setSearchBox(false);
    setTimeout(hideLoading, 3000);
  };

  // Render sellers and their products
  const searchResult = aggregatedResult.map((brandObject, index) => (
    <div key={index}>
      <ListGroup.Item>
        <Link to={`/brands/${brandObject?.name}`} onClick={handleSearchClick}>
          {brandObject?.name}
        </Link>
      </ListGroup.Item>

      {brandObject?.items && brandObject?.items.length > 0 && (
        <ListGroup>
          {brandObject?.items.map((product, productIndex) => (
            <ListGroup.Item key={productIndex} className="ml-4">
              <Link to={`/products/${product.id}`} onClick={handleSearchClick}>
                {product.name}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  ));

  return (
    <>
      <div className={`${searchSx} search-bar`}>
        <InputGroup>
          <FormControl
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="search for a brand or product"
            className="text-left"
          />
        </InputGroup>
      </div>

      {searchBox && (
        <ListGroup className={`${resultSx} search-results mb-2`}>
          {searchResult.length ? searchResult : <span>No results found...</span>}
        </ListGroup>
      )}
    </>
  );
}