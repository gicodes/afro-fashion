/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import './collection.styles.scss';
import { categories } from './collection.component';
import Directory from '../directory/mobile.directory.component';

const CollectItems = () => {
  return <Directory categories={categories} />
};

export default CollectItems;