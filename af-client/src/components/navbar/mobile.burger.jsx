/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import useClickOutside from '../../hooks/autoClose.component';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
    title: 'SAA Brand',
    link: '/brands',
  },
  {
    id: 4,
    title: 'About Us',
    link: '/help',
  },
  {
    id: 5,
    title: 'Credits',
    link: '/credits',
  },
]

const BurgerMenu = ({isOpen, onClose}) => {
  const sideNavRef = useClickOutside(isOpen, onClose);

  return (
    <Container ref={sideNavRef}>
      <nav className="burger-menu bg-black-gradient">
        <div className="m-2 pt-5">
          <div className='vh-93'/>

          { navLinks.map((item, index) => (
              <div
                key={item.id}
                className={`${index === navLinks.length - 1 ? "mb-0" : "mb-2"}`}
              >
                <Link 
                  to={item.link} 
                  onClick={onClose}
                  className='nav-link mb-4'
                >
                  {item.title}
                </Link>
              </div>
            )
          )}

          <div className='text-center burger-bottom'>
            <h1 className='nav-brand fs-mid'>
              <span className="green">A</span>
              <span className='text-primary'>fro</span>
              <span className="green">f</span><span className='text-primary'>ash</span>
              <span className="green">ion</span>
            </h1>
            <p>
              <span className='fs-tiny'>EST. 2022 - 2024</span>
            </p>
          </div>
        </div>
      </nav>
    </Container>
  )
}

export default BurgerMenu;