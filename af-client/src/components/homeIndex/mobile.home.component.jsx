/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { Container } from "react-bootstrap";
import Divider from "@mui/material/Divider";
import Footer from "../routes/navbar/footer";
// import AdSection from "../adsection/mobile.ads";
import LatestIndex from "./indexServices/new&latest";
import CategoryIndex from "./indexServices/categories";
import { SearchBar } from "../searchServices/search-bar";
import TrendingIndex from "./indexServices/hot&trending";
// import LearnAboutAF from "./indexServices/learnAboutAf";
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
        {/* <LearnAboutAF/> */}
        <TrendingIndex />
        <Footer/>
      </Container>
    </>
  )
}

export default HomeIndex;