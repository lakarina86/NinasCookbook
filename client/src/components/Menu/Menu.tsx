import React, { useState, useRef, useEffect } from 'react'
import { MenuIcon } from '../icons/MenuIcon'
import './Menu.css'
import { Link } from "react-router-dom"
import { useUserContext } from '../../contexts/UserContext'

//https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks

const Menu: React.FC = () => {
  const menuRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);
  const { logout } = useUserContext();

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      if( menuRef.current !== null && !menuRef.current.contains(e.target as HTMLElement)) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    }

  }, [isActive])

  return (
    <div className='menu-container'>
      <MenuIcon onClick={onClick} color="black" className="menu-trigger"/>
      <nav onClick={onClick} ref={menuRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
        <ul>
          <Link to="/new-recipe"><li>Add new Recipe</li></Link>
          <Link to="/my-favorites"><li>My Favorites</li></Link>
          <li className="clickable" onClick={() => logout()}>Logout</li>
        </ul>
      </nav>
    </div>
  )
}

export {Menu}