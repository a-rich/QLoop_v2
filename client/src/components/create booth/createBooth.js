import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import "../../css/createBooth/create_booth.css";

class CreateBoothComponent extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className={"main-wrapper"}>
                <div className={"grid-container"}>
                    <div className={"createBooth-container w3-card-4"}>
                        <div className={"dj-queue-full-size"}>
                    
                                <div className= {"dj-queue-non-scrollable"}>
                                    Create a Booth
                                </div>

                                <div className= {"dj-queue-scrollable"}>
                                
                                
                                </div>

                        </div>
                    </div> 
                </div>  
            </div> 
        )
    }
}
export default CreateBoothComponent;