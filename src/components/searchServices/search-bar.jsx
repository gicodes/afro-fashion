import { useContext, useState } from 'react';
import { BrandContext } from '../../contexts/brand.context';
import { FormControl, InputGroup, ListGroup } from 'react-bootstrap';

import './search.styles.scss';

export const SearchBar = ({ searchSx, resultSx }) => {

  const { searchItemsByBrand } = useContext(BrandContext);

  const [search, setSearch] = useState('');
  const [searchBox, setSearchBox] = useState(false);
  const [aggregatedResult, setAggregatedResult] = useState([]);

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearch(value);
    setSearchBox(true);

    const brands = await searchItemsByBrand(value);
    setAggregatedResult(brands);

    if (value === '') {
      setSearchBox(false);
    }
  };

  const handleSearchClick = () => {
    setSearchBox(false);
  };

  const searchResult = aggregatedResult?.map((brand, index) => (
    <ListGroup.Item key={index}>
      <a href={`/seller/${brand}`} onClick={handleSearchClick}>
        {brand}
      </a>
    </ListGroup.Item>
  ));

  return (
    <>
      <div className={`${searchSx} bg-trans search-bar`}>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Search for a brand"
            value={search}
            onChange={handleSearch}
          />
          <button type="button" className="btn btn-info" onClick={searchItemsByBrand}>Go</button>
        </InputGroup>
      </div>
      {searchBox && 
        <ListGroup className={`${resultSx} search-results mb-2`}>
          {searchResult.length ? searchResult : (<span>No results found...</span>)}
        </ListGroup>
      }
    </>
  );
};