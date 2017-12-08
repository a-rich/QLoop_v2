import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

import HomeImg from '../../images/hp.jpg'
import '../../css/home_page.css';

class HomePage extends Component {
    render() {
        return(
            <div className ={"MainPage"}>
                <div className = {"ImageLogo"}>
                    <img src ={HomeImg}/>
                </div>
            </div>
        );
    }
}

export default HomePage;