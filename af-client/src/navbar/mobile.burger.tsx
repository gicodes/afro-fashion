/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import useClickOutside from '../hooks/autoClose.component.tsx';
import { Container } from 'react-bootstrap';
import { subPages } from './page-popup.tsx';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export const navLinks = [
  {
    id: 1,
    title: 'Dashboard',
    link: '/dashboard',
  },
  {
    id: 2,
    title: 'Marketplace',
    link: '/marketplace',
  },
  {
    id: 3,
    title: 'Seller Hub',
    link: '/brands',
  },
  {
    id: 4,
    title: 'Support',
    link: '/support',
  },
  {
    id: 5,
    title: 'Credits',
    link: '/credits',
  },
]

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onClose }) => {
  const sideNavRef = useClickOutside(isOpen, onClose);
  const [ showSubPages, setShowSubPages ] = useState<boolean>(false);

  return (
    <Container ref={sideNavRef}>
      <nav className="burger-menu bg-black-gradient">
        <div className="m-2 pt-2">
          <div className="vh-93" />
          { navLinks.map((item) => (
            <div key={item.id} className="mt-2">
              <Link
                to={item.link}
                onClick={(e: any) => {
                  if (item.title === 'Support') {
                    e.preventDefault();
                    setShowSubPages(!showSubPages); 
                  } else onClose();
                }}
                className="nav-link mb-4"
              >
                {item.title}
              </Link>
              {item.title === 'Support' && showSubPages && (
                <div className="-mt mb-4">
                  { subPages.map((page, i) => (
                    <div key={i} className="mb-2">
                      <Link
                        to={page.path}
                        onClick={onClose} 
                        className="nav-link"
                      >
                        <span className='sub-page'>{page.name}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="burger-bottom">
            <h1 className="nav-brand fs-mid">
              <span className="green">A</span>
              <span className="text-luminous">fro</span>
              <span className="green">f</span>
              <span className="text-luminous">ash</span>
              <span className="green">ion</span>
            </h1>
            <p><span className="fs-tiny">EST. 2023 - 2025</span></p>
          </div>
        </div>
      </nav>
    </Container>
  );
}

export default BurgerMenu;
