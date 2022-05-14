import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { NavLink } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
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
                    <Link className="navbar-brand" to="/"><img src="/logo.png" height="50px" alt="" /> <strong>FlughafenChauffeur</strong></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" href="#">Sachentransporte</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" href="#">Kontakt</NavLink>
                            </li>
                            {user && <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Admin
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li> <Link to="/admin/bookings" className="dropdown-item">Bookings</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/settings">Settings</Link></li>
                                    <li><Link className="dropdown-item" to="#" onClick={logout}>Logout</Link></li>
                                </ul>
                            </li>}
                        </ul>
                        <div className="mx-3">
                            {user && <Link to='/admin' className="btn btn-success rounded-pill px-3 me-2" type="submit">Dashboard</Link>}
                            {!user && <Link to="/" className="btn btn-danger rounded-pill px-3" type="submit">Anfrage</Link>}
                        </div>
                    </div>
                </div>
            </nav>
        </header >
    );
};

export default Header;