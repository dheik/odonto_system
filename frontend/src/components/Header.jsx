import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo_sistema_odontologico.svg';
import '../styles/Header.css';

function Header() {
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserData(parsedUser);
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserData(null);
        setShowUserMenu(false);
        navigate('/login');
    };

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };

    // Fecha o menu quando clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showUserMenu && !event.target.closest('.user-menu-container')) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserMenu]);

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
                                    {userData ? (
                                        <>
                                            <span className="user-name">Dr(a). {userData.username}</span>
                                            <span className="user-email">{userData.email}</span>
                                        </>
                                    ) : (
                                        <span className="user-name">Usuário</span>
                                    )}
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