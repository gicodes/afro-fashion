/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import React from "react";
import CategoryIndex from "./categories.tsx";
import { Container } from "react-bootstrap";
import Divider from "@mui/material/Divider";
import Footer from "./footer/footer.tsx";
import LatestIndex from "./featured/new&latest.tsx";
import TrendingIndex from "./featured/hot&trending.tsx";
import IndexImages from "./indexServices/indexImages.tsx";
import { SearchBar } from "../components/searchServices/search-bar.tsx";
import { categories } from "../components/collection/collection.component.tsx";

const HomeIndex = () => {
  return (
    <>
      <Container className="no-padding-container bg-lg">
        <SearchBar resultSx={"-mt pt-2"} searchSx={null} />
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