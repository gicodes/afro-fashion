/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { Container } from "react-bootstrap";
import AdSection from "../adsection/mobile.ads";
import LatestIndex from "./indexServices/new&latest";
import CategoryIndex from "./indexServices/categories";
import { SearchBar } from "../searchServices/search-bar";
import TrendingIndex from "./indexServices/hot&trending";
import { categories } from "../collection/collection.component";
import LearnAboutAF from "./indexServices/learnAboutAf";

// This component is rendered on the landing page
const HomeIndex = () => {
  return (
    <>
      <Container className="no-padding-container bg-lg mb-3">
        <SearchBar resultSx={"-mt pt-2"}/>
        <AdSection />
        <CategoryIndex categories={categories} />
        <LatestIndex />
        {/* <LearnAboutAF /> */}
        <TrendingIndex />
      </Container>
    </>
  )
}

export default HomeIndex;