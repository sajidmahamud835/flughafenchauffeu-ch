import React from 'react';

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img src="/logo.png" height="50px" alt="" /> <strong>FlughafenChauffeur</strong></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Sachentransporte</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">AGB´s</a>
                            </li><li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Kontakt</a>
                            </li>
                        </ul>
                        <div className="mx-3">
                            <button class="btn btn-danger rounded-pill px-3" type="submit">Anfrage</button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;