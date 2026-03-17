import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaChevronDown } from 'react-icons/fa';
import './navstyles.css';

const NavigationBar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('token')));
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef();

    useEffect(() => {
        const onStorage = () => setIsAuthenticated(Boolean(localStorage.getItem('token')));
        const onAuthChanged = () => setIsAuthenticated(Boolean(localStorage.getItem('token')));
        window.addEventListener('storage', onStorage);
        window.addEventListener('authChanged', onAuthChanged);
        return () => {
            window.removeEventListener('storage', onStorage);
            window.removeEventListener('authChanged', onAuthChanged);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenu(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setOpenMenu(false);
        navigate('/login');
    };

    return (
        <div className="navbar">
            <div className='logo-name'>
                <div className='logo-img'><img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="logo"></img></div>
                <div className="logo">PawDiaries</div>
            </div>

            <ul className="nav-links">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/addapet">Add a Pet</Link></li>
                {/* <li><Link to="/profile">Pet Profile</Link></li> */}

                {!isAuthenticated ? (
                    <li className="sign-in-btn">
                        <Link to="/login">Sign In</Link>
                    </li>
                ) : (
                    <li className="account-wrapper" ref={menuRef}>
                        <button className="account-btn" onClick={() => setOpenMenu(v => !v)}>
                            <FaUserCircle size={20} style={{ marginRight: 6 }} />
                            <FaChevronDown size={12} />
                        </button>
                        {openMenu && (
                            <div className="account-dropdown">
                                <Link to="/profile" className="dropdown-item" onClick={() => setOpenMenu(false)}>My Pets</Link>
                                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </li>
                )}
            </ul>
        </div>
    );
};

export default NavigationBar;
