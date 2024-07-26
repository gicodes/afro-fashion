/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { Container } from "react-bootstrap";
import Divider from "@mui/material/Divider";
import Footer from "../index/footer/footer";
import LatestIndex from "./new&latest";
import CategoryIndex from "./categories";
import TrendingIndex from "./hot&trending";
// import AdSection from "../adsection/mobile.ads";
import { SearchBar } from "../searchServices/search-bar";
import { categories } from "../collection/collection.component";

// This component is rendered on the landing page
const HomeIndex = () => {
  return (
    <>
      <Container className="no-padding-container bg-lg">
        <SearchBar resultSx={"-mt pt-2"}/>
        {/* <AdSection /> */}
        <CategoryIndex categories={categories} />
        <LatestIndex />
        <Divider />
        <TrendingIndex />
        <Footer/>
      </Container>
    </>
  )
}

export default HomeIndex;