import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import "../../css/booth_components/boothMain.css";

import  BoothMainQueueComponent  from "./BoothMainQueueComponent";
import  BoothDjListComponent from "./BoothDjListComponent";
import  BoothMyYtComponent from "./BoothMyYtComponent";
import BoothSearchYtComponent from "./BoothSearchYtComponent";
class BoothMainComponent extends Component{

    constructor(){
        super();
        this.state = {
            showSearch: true,
        }
    }

    render(){
        return(
            <div className={"main-wrapper"}>
                <div className={"grid-container"}>
                    <div className={"main-queue-container w3-card-4"}>
                        <BoothMainQueueComponent> </BoothMainQueueComponent>
                    </div> 
                    <div className={"djs-queue-container w3-card-4"}>
                        <BoothDjListComponent> </BoothDjListComponent>
                    </div> 
                    <div className={"bottom-container"}>
                        <div className={"w3-card-4"}>
                            {
                                this.state.showSearch === false 
                                ?<BoothMyYtComponent> </BoothMyYtComponent> 
                                :<div> </div>
                            }
                        </div>
                        <div className={" w3-card-4"}> 
                            {
                                this.state.showSearch === true 
                                ?<BoothSearchYtComponent> </BoothSearchYtComponent> 
                                :<div> </div>
                            }
                        </div>
                    </div>
                </div>
                <div className={"music-controls-container"}>
                
                </div>
            </div>
        )
    }


}

export default BoothMainComponent;
