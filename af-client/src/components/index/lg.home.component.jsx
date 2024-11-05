/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import Footer from "./footer/footer";
import { Paper } from "@mui/material";
import CategoryIndex from "./categories";
import LatestIndex from "./featured/new&latest";
import TrendingIndex from "./featured/hot&trending";
import { SearchBar } from "../routes/searchServices/search-bar";
import { categories } from "../collection/collection.component";
import IndexImages from "./indexServices/indexImages";

const HomeIndex = () => {
  return (
    <>
      <Paper>
        <SearchBar 
          searchSx={"mt-1"} 
          resultSx={"fullWidth"} 
        />
        <IndexImages />
        <CategoryIndex categories={categories} />
        <div className="featured-container">
          <LatestIndex />
          <TrendingIndex />
        </div>
        <Footer/>
      </Paper>
    </>
  )
}

export default HomeIndex;