/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { Container } from "react-bootstrap";
import Footer from '../routes/navbar/footer';
// import AdSection from "../adsection/mobile.ads";
import LatestIndex from "./indexServices/new&latest";
import CategoryIndex from "./indexServices/categories";
// import LearnAboutAF from "./indexServices/learnAboutAf";
import { SearchBar } from "../searchServices/search-bar";
import TrendingIndex from "./indexServices/hot&trending";
import { categories } from "../collection/collection.component";

// This component is rendered on the landing page
const HomeIndex = () => {
  return (
    <>
      <Container className="no-padding-container bg-lg mb-3">
        <section id="search">
          <SearchBar resultSx={"-mt pt-2"}/>
        </section>
        {/* <AdSection /> */}
        <CategoryIndex categories={categories} />
        <LatestIndex />
        {/* <LearnAboutAF /> */}
        <TrendingIndex />
        <Footer/>
      </Container>
    </>
  )
}

export default HomeIndex;