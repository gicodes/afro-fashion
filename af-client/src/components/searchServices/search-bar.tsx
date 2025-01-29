import './search.styles.scss';
import debounce from 'lodash.debounce';
import { Link } from 'react-router-dom';
import { FormControl, InputGroup } from 'react-bootstrap';
import BrandContext from '../../contexts/brand.context.tsx';
import { CategoriesContext } from '../../contexts/categories.context.tsx';
import React, { useCallback, useContext, useMemo, useState } from 'react';

interface SearchBarProps {
  searchSx: string | null;
  resultSx: string | null;
}

interface SearchResultsObject {
  title: string;
  items: { type: string; name: string; link: string }[];
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchSx, resultSx }) => {
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>();
  const [searchBox, setSearchBox] = useState<boolean>(false);
  const { searchItemsByBrand } = useContext(BrandContext) || {};
  const { searchProductsWithCategory } = useContext(CategoriesContext) || {};
  const [aggregatedResult, setAggregatedResult] = useState<SearchResultsObject[]>([]);

  const fetchResults = useMemo(() => 
    debounce(async (value: string, searchItemsByBrand, searchProductsWithCategory, setAggregatedResult, setLoading) => {
      if (!value || !searchItemsByBrand || !searchProductsWithCategory) {
        setAggregatedResult([]);
        return;
      }
  
      try {
        setLoading(true);
  
        const [brands, categoriesWithProducts] = await Promise.all([
          searchItemsByBrand(value),
          searchProductsWithCategory(value),
        ]);
  
        const categoryNames = new Set(categoriesWithProducts.map(category => category.title.toLowerCase()));
  
        const brandResults = brands
          .filter(brand => !categoryNames.has(brand.title.toLowerCase())) 
          .map((brand) => ({
            title: brand.title,
            items: brand.items?.map((item) => ({
              type: 'brand',
              name: brand.title,
              link: `brands/${brand.title}`,
            })) || [],
          }));
  
        const categoryResults = categoriesWithProducts.map(category => ({
          title: category.title,
          items: category.items || [],
        }));
  
        setAggregatedResult([...brandResults, ...categoryResults]);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setAggregatedResult([]);
      } finally {
        setLoading(false);
      }
    }, 300),
  [], // Memoized once (dependencies handled in `useCallback`)
  );
  
  const searchCallback = useCallback(
    (value: string) => fetchResults(value, searchItemsByBrand, searchProductsWithCategory, setAggregatedResult, setLoading),
    [fetchResults, searchItemsByBrand, searchProductsWithCategory, setAggregatedResult, setLoading]
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    setSearchBox(!!value);
    searchCallback(value);
  };

  const handleSearchClick = useCallback(() => {
    setLoading(true);
    setSearchBox(false);
    setTimeout(setLoading, 3000);
  }, [setLoading, setSearchBox]);

  const searchResult = useMemo(
    () =>
      aggregatedResult.map((result) => (
        <div key={result.title}>
          <div className={`${result.items.some((item) => item.type === 'brand') ? 'brand' : 'category'}-result`}>
            <Link to={result.items.find((item) => item.type !== 'product')?.link || '#'} onClick={handleSearchClick}>
              <span>{result.title}</span>
            </Link>
          </div>

          {result.items
            .filter((item) => item.type === 'product')
            .map((item) => (
              <div key={item.name} className="product-result">
                <Link to={item.link} onClick={handleSearchClick}>
                  <span>{item.name}</span>
                </Link>
              </div>
            ))}
        </div>
      )),
    [aggregatedResult, handleSearchClick]
  );
    
  return (
    <div>
      <div className={`${searchSx} search-bar`}>
        <InputGroup>
          <FormControl
            type="text"
            value={search}
            className="text-left"
            onChange={handleSearch}
            placeholder="Search for a brand, product or category"
          />
        </InputGroup>
      </div>

      {searchBox && (
        <div className={`search-results-container ${resultSx} mb-1`}>
          {searchResult.length ? searchResult : <span className='text-gray'> {loading ? "searching ..." : "No results found ..."} </span>}
        </div>
      )}
    </div>
  );
};
