/* This is a Desktop first Component. Designed to render on Desktop Devices */

import './collections/collection.styles.scss';
import Directory from '../directory/directory.component';

const Collection = () => {
  const categories = [
    {
      id: 1,
      title: 'Kids clothing',
      imageUrl: 'https://images.unsplash.com/photo-1570545917537-873e36d4f64a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
      route: 'shop/kids',
    },
    {
      id: 2,
      title: 'Women Clothing',
      imageUrl: 'https://i.ibb.co/M6hHc3F/brown-trench.png',
      route: 'shop/womens',
    },
    {
      id: 3,
      title: 'Men Clothing',
      imageUrl: 'https://i.ibb.co/mh3VM1f/polka-dot-shirt.png',
      route: 'shop/mens',
    },
    {
      id: 4,
      title: "Mimi's Fabrics",
      imageUrl: 'https://images.unsplash.com/photo-1601056639638-c53c50e13ead?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFicmljc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      route: 'shop/mimisfabrics',
    },
    {
      id: 5,
      title: 'Hats & head gears',
      imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
      route: 'shop/hats',
    },
    {
      id: 6,
      title: 'Accessories',
      imageUrl: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhc2hpb24lMjBhY2Nlc3Nvcmllc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      route: 'shop/accessories',
    },
    {
      id: 7,
      title: 'Jackets & Coats',
      imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
      route: 'shop/jackets',
    },
    {
      id: 8,
      title: 'Sneakers & Trainers',
      imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
      route: 'shop/sneakers',
    },
    {
      id: 9,
      title: 'Boots & Shoes',
      imageUrl: 'https://i.ibb.co/Mhh6wBg/timberlands.png',
      route: 'shop/shoes',
    },
    {
      id: 10,
      title: 'Slippers & Slides',
      imageUrl: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2xpcHBlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      route: 'shop/slippers',
    },
    {
      id: 11,
      title: 'Fashion Bags',
      imageUrl: 'https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
      route: 'shop/bags',
    },
    {
      id: 12,
      title: 'Africana',
      imageUrl: 'https://media.istockphoto.com/id/1384884976/photo/young-black-woman-playing-with-her-daughter.jpg?s=612x612&w=0&k=20&c=bnGaBdQfImLCwVyit2WMCK5lEk3S585Xfq2WEKHFrj4=',
      route: 'shop/africana',
    },
  ]

  return <Directory categories={categories} />
};


export default Collection;