/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { Container } from "react-bootstrap";
import AdSection from "../adsection/mobile.ads";
import { SearchBar } from "../searchServices/search-bar";
import TrendingIndex from "./indexServices/hot&trending";
import CategoryIndex from "./indexServices/categories";

import './directory.styles.scss';

// This component is rendered on the landing page
const Directory = ({categories}) => {
  return (
    <>
      <Container className="no-padding-container bg-gray mb-3">
        <SearchBar resultSx={"-mt pt-2"}/>
        <AdSection />
        <CategoryIndex categories={categories} />
        <TrendingIndex />
      </Container>
    </>
  )
}

export default Directory;