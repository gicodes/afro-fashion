/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import "../collection/collection.styles.scss";

import LatestIndex from "./new&latest";
import CategoryIndex from "./categories";
import TrendingIndex from "./hot&trending";
// import AdSection from "../adsection/ads";
import { Container } from "react-bootstrap";
import Divider from "@mui/material/Divider";
import { SearchBar } from "../searchServices/search-bar";
import { categories } from "../collection/collection.component";
import Footer from "../index/footer/footer";

// This component is rendered on the landing page
const HomeIndex = () => {
  return (
    <>
      <Container className="no-padding-container categories-container">

        {/* AdSection disabled until further notice */}
        {/* <AdSection /> */}

        <section id="search">
          
        </section>
        <SearchBar searchSx={"mt-1"} resultSx={"fullWidth"} />
        <CategoryIndex categories={categories}/>
        <div className="featured-container">
          <TrendingIndex />
          <Divider className="hide-in-lg" orientation="vertical" variant="middle" flexItem sx={{backgroundColor:"#404040"}} />
          <LatestIndex />
        </div>
        <Footer/>
      </Container>
      <div className="lg-div"></div>
    </>
  )
}

export default HomeIndex;