/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { Container } from 'react-bootstrap';
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

const BurgerMenu = () => {
  return (
    <Container>
      <nav className="burger-menu bg-black-gradient z-index-9999">
        <div className="flex-column justify-content-end align-items-center flex-1">
          {  
            navLinks.map((item, index) => (
              <div
                key={item.id}
                className={`${index === navLinks.length - 1 ? "mb-0" : "mb-2"}`}
              >
                <Link to={item.link} className='nav-link flex-just-center'>
                  {item.title}
                </Link>
              </div>
            ))}
        </div>
      </nav>
    </Container>
  )
}

export default BurgerMenu;