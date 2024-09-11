/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import CategoryIndex from "./categories";
import Divider from "@mui/material/Divider";
import Footer from "../index/footer/footer";
import LatestIndex from "./featured/new&latest";
import TrendingIndex from "./featured/hot&trending";
import { SearchBar } from "../searchServices/search-bar";
import { categories } from "../collection/collection.component";

import "../collection/collection.styles.scss";

// This component is rendered on the landing page
const HomeIndex = () => {
  return (
    <>
      <div className="categories-container">
        {/* AdSection disabled until further notice */}
        <SearchBar 
          searchSx={"mt-1"} 
          resultSx={"fullWidth"} 
        />
        <CategoryIndex categories={categories} />
        <div className="featured-container">
          <TrendingIndex />
          <Divider 
            className="hide-in-lg" 
            orientation="vertical"  
            variant="middle" 
            flexItem sx={{
              backgroundColor:"#404040"
              }} 
            />
          <LatestIndex />
        </div>
        <Footer/>
      </div>
      <div className="lg-div" />
    </>
  )
}

export default HomeIndex;