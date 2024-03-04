/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { Container, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const navLinks = [
  {
    id: 1,
    title: 'Marketplace',
    href: '/marketplace',
  },
  {
    id: 2,
    title: 'AF Brands',
    href: '/brands',
  },
  {
    id: 3,
    title: 'My Profile',
    href: '/profile',
  },
  {
    id: 4,
    title: 'Credits',
    href: '/credits',
  },
  {
    id: 5,
    title: 'Help Desk',
    href: '/help',
  },
]

const BurgerMenu = () => {
  return (
    <nav className="burger-menu bg-black-gradient z-index-9999">
      <Container>
        <ListGroup className="flex-column justify-content-end align-items-center flex-1">
          {  
            navLinks.map((nav, index) => (
              <div
                key={nav.id}
                className={`${index === navLinks.length - 1 ? "mb-0" : "mb-2"}`}
              >
                <Link to={nav.href} className='nav-link'>
                  {nav.title}
                </Link>
              </div>
            ))}
        </ListGroup>
      </Container>
    </nav>
  )
}

export default BurgerMenu;