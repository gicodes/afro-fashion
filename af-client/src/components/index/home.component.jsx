/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */


import CategoryIndex from "./categories";
import { Container } from "react-bootstrap";
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