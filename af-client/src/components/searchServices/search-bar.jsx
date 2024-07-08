import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useLoading } from '../../contexts/loading.context';
import { BrandContext } from '../../contexts/brand.context';
import { FormControl, InputGroup, ListGroup } from 'react-bootstrap';

import './search.styles.scss';

export const SearchBar = ({ searchSx, resultSx }) => {
  const [search, setSearch] = useState('');
  const [searchBox, setSearchBox] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const { searchItemsByBrand } = useContext(BrandContext);
  const [aggregatedResult, setAggregatedResult] = useState([]);

  const handleSearch = async (event) => {
    const value = event.target.value;

    setSearch(value);
    setSearchBox(true);

    const brands = await searchItemsByBrand(value);
    if (Array.isArray(brands)) {
      setAggregatedResult(brands);
    } else {
      setAggregatedResult([]);
    }

    if (value === '') setSearchBox(false);
  };

  const handleSearchClick = () => {
    showLoading();
    setSearchBox(false);

    setInterval(() => hideLoading(), 3000)
  };

  const searchResult = aggregatedResult?.map((brandObject, index) => (
    <ListGroup.Item key={index}>
      <Link to={`/brands/${brandObject}`} onClick={handleSearchClick}>
        {brandObject}
      </Link>
    </ListGroup.Item>
  ))

  return (
    <>
      <div className={`${searchSx} bg-trans search-bar`}>
        <InputGroup>
          <FormControl
            type="text"
            placeholder=" Search for a seller or product..."
            value={search}
            onChange={handleSearch}
          />
        </InputGroup>
      </div>
      {searchBox && 
        <ListGroup className={`${resultSx} search-results mb-2`}>
          { searchResult.length ? searchResult : (
            <span>No results found...</span>
          )}
        </ListGroup>
      }
    </>
  );
};