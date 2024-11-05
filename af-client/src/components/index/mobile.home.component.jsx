/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import CategoryIndex from "./categories";
import { Container } from "react-bootstrap";
import Divider from "@mui/material/Divider";
import Footer from "../index/footer/footer";
import LatestIndex from "./featured/new&latest";
import TrendingIndex from "./featured/hot&trending";
import { SearchBar } from "../routes/searchServices/search-bar";
import { categories } from "../collection/collection.component";
import IndexImages from "./indexServices/indexImages";

const HomeIndex = () => {
  return (
    <>
      <Container className="no-padding-container bg-lg">
        <SearchBar resultSx={"-mt pt-2"} />
        <IndexImages />
        <CategoryIndex categories={categories} />
        <LatestIndex />
        <Divider />
        <TrendingIndex />
        <Footer />
      </Container>
    </>
  )
}

export default HomeIndex;