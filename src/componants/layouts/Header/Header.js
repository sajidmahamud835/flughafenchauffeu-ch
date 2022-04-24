import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { NavLink } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import FirebaseApp from '../../../firebase/FirebaseApp';

const auth = getAuth(FirebaseApp);
const Header = () => {
    const logout = () => {
        signOut(auth);
    };
    const [user, loading, error] = useAuthState(auth);
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" href="#"><img src="/logo.png" height="50px" alt="" /> <strong>FlughafenChauffeur</strong></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" href="#">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" href="#">Sachentransporte</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" href="#">Kontakt</NavLink>
                            </li>
                            {user && <li class="nav-item dropdown">
                                <NavLink class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Admin
                                </NavLink>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><NavLink class="dropdown-item" href="#">Bookings</NavLink></li>
                                    <li><NavLink class="dropdown-item" href="#">Settings</NavLink></li>
                                    <li><NavLink class="dropdown-item" onClick={logout}>Logout</NavLink></li>
                                </ul>
                            </li>}
                        </ul>
                        <div className="mx-3">
                            {user && <button className="btn btn-success rounded-pill px-3 me-2" type="submit">Dashboard</button>}
                            {!user && <button className="btn btn-danger rounded-pill px-3" type="submit">Anfrage</button>}
                        </div>
                    </div>
                </div>
            </nav>
        </header >
    );
};

export default Header;