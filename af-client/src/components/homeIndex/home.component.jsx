/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import "../collection/collection.styles.scss";

import AdSection from "../adsection/ads";
import { Container } from "react-bootstrap";
import Divider from "@mui/material/Divider";
import LatestIndex from "./indexServices/new&latest";
import CategoryIndex from "./indexServices/categories";
import TrendingIndex from "./indexServices/hot&trending";
import { SearchBar } from "../searchServices/search-bar";
import { categories } from "../collection/collection.component";

// This component is rendered on the landing page
const HomeIndex = () => {
  return (
    <>
      <Container className="no-padding-container categories-container">
        <AdSection />
        <SearchBar searchSx={"mt-1"} resultSx={"lg-fullWidth"} />
        <CategoryIndex categories={categories}/>
        <div className="featured-container">
          <TrendingIndex />
          <Divider orientation="vertical" variant="middle" flexItem sx={{backgroundColor:"#404040"}} />
          <LatestIndex />
        </div>
      </Container>
      <div className="mt-5"></div>
    </>
  )
}

export default HomeIndex;