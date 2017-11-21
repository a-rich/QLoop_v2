import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">QLoop</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                          <li className="nav-item">
                            <a className="nav-link" href="#">My QLoop <span className="sr-only">(current)</span></a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="#">Create Booth</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="#">Public Booths</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link disabled" href="#">LogOut</a>
                          </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;
