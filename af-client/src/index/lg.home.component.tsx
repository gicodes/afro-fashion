/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import React from "react";
import Footer from "./footer/footer.tsx";
import { Paper } from "@mui/material";
import CategoryIndex from "./categories.tsx";
import LatestIndex from "./featured/new&latest.tsx";
import TrendingIndex from "./featured/hot&trending.tsx";
import IndexImages from "./indexServices/indexImages.tsx";
import { SearchBar } from "../components/searchServices/search-bar.tsx";
import { categories } from "../components/collection/collection.component.tsx";

const HomeIndex: React.FC = () => {
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