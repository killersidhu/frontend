import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"

const Navbar = () => {

    const [navBarOpen, setNavBarOpen] = useState(false);

    const links = [
        {
            id:1,
            path:'/',
            text:'Home',
        },
        {
            id:2,
            path:'/about',
            text:'About',   
        },
        {
            id: 3,
            path:'/logout',
            text: 'Log Out'
        }
    ]

    const handleToggle = () => {
        setNavBarOpen(prev => !prev);
    }

    const closeMenu = () => {
        setNavBarOpen(false)
    }
    const logout = ()=>{
        localStorage.clear()
        window.location.href="/"
    }
    return (
        <nav className='navBar'>
            <button onClick={handleToggle}>
                {navBarOpen ? (
                    <MdClose style={{ color: "#fff", width: "40px", height: "40px" }} />
                ) : (
                    <FiMenu style={{ color: "#7b7b7b", width: "40px", height: "40px" }} />
                )}
            </button>
            
            <ul className={`menuNav ${navBarOpen ? 'showMenu' : ''}`}>
                {links.map(link =>{
                    return(
                        link.id === 3 ? <li key={link.id}>
                            <NavLink 
                            onClick={() => logout()}
                            exact>
                            { link.text }</NavLink>
                        </li> : 
                        <li key={link.id}>
                            <NavLink 
                            to ={link.path} 
                            onClick={() => closeMenu()}
                            exact>
                            { link.text }</NavLink>
                        </li>
                    )
                })}
            </ul>
            
        </nav>
    );
}
 
export default Navbar;