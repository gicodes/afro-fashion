/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdSection from "../adsection/mobile.ads";
import { SearchBar } from "../searchServices/search-bar";

import './directory.styles.scss';
import TrendingIndex from "./indexServices/hot&trending";
import CategoryIndex from "./indexServices/categories";

// This component is rendered on the landing page
const Directory = ({categories}) => {

  const navigate = useNavigate();
  const onRouteHandler = (route) => { navigate(route) }

  return (
    <>
      <Container className="no-padding-container mb-3">
        <SearchBar resultSx={"-mt pt-2"}/>
        <AdSection />
        <CategoryIndex categories={categories} />
        <TrendingIndex />
      </Container>
    </>
  )
}

export default Directory;