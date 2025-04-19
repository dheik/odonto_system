import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo_sistema_odontologico.svg';
import '../styles/Header.css';

function Header() {
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-left">
                    <Link to="/" className="logo-container">
                        <img src={logo} alt="Logo Odonto System" className="logo" />
                        <span className="logo-text">OdontoSystem</span>
                    </Link>
                </div>

                <div className="header-right">
                    <div className="user-menu-container">
                        <button 
                            className="user-icon-button"
                            onClick={toggleUserMenu}
                            title="Menu do usuário"
                        >
                            <FontAwesomeIcon 
                                icon={faUserCircle} 
                                size="lg"
                                style={{ fontSize: '24px' }} 
                            />
                        </button>
                        {showUserMenu && (
                            <div className="user-dropdown">
                                <div className="user-info">
                                    <span className="user-name">Menu do Usuário</span>
                                </div>
                                <div className="dropdown-divider"></div>
                                <button onClick={handleLogout} className="logout-button">
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    Sair
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header; 