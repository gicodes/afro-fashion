/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { Container } from 'react-bootstrap';
import { useEffect, useRef } from 'react'; 
import { Link } from 'react-router-dom';

export const navLinks = [
  {
    id: 1,
    title: 'Marketplace',
    link: '/marketplace',
  },
  {
    id: 2,
    title: 'AF Brands',
    link: '/brands',
  },
  {
    id: 3,
    title: 'My Profile',
    link: '/profile',
  },
  {
    id: 4,
    title: 'Credits',
    link: '/credits',
  },
  {
    id: 5,
    title: 'Help Desk',
    link: '/help',
  },
]

const BurgerMenu = ({isOpen, onClose}) => {
  const sideNavRef = useRef(null); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideNavRef.current 
          && !sideNavRef.current.contains(event.target)
        ) onClose()
    };

    if (isOpen) document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <Container
      ref={sideNavRef}
    >
      <nav className="burger-menu bg-black-gradient">
        <div className="m-2">
          <div className='vh-93'/>
          {  
            navLinks.map((item, index) => (
              <div
                key={item.id}
                className={`${index === navLinks.length - 1 ? "mb-0" : "mb-2"}`}
              >
                <Link 
                  to={item.link} 
                  onClick={onClose}
                  className='nav-link mb-3'
                >
                  {item.title}
                </Link>
              </div>
            ))}

          <div className='burger-bottom'>
            <h1 className='mr-3 nav-brand'>
              <span className="green">A</span><span className='text-primary'>fro</span>
              <span className="green">f</span><span className='text-primary'>ash</span><span className="green">ion</span>
            </h1>
            <p>EST. 2022 - 2024</p>
          </div>
        </div>
      </nav>
    </Container>
  )
}

export default BurgerMenu;