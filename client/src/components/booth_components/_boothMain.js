import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import SocketIOClient from 'socket.io-client';

import "../../css/booth_components/boothMain.css";
import  BoothMainQueueComponent  from "./BoothMainQueueComponent";
import  BoothDjListComponent from "./BoothDjListComponent";
import  BoothMyYtComponent from "./BoothMyYtComponent";
import  BoothSearchYtComponent from "./BoothSearchYtComponent";
import  BootPlayBarComponent from "./BoothPlayBarComponent";
import  { getBoothData } from "../../actions/createBooth";

class BoothMainComponent extends Component{
    constructor(){
        super();

        this.socket = SocketIOClient('127.0.0.1:5000');

        this.state = {
            showSearch: true,
        }
    }

    componentWillMount () {
    }

    /*getBoothData() {
        const friendSearch = _.debounce((term) => { 
            this.props.getBoothData()
        }, 10000);
        /*var dataLoop = _.debounce(this.props.getBoothData(()=> {
                console.log("here");
                this.props.getBoothData()
            }) , 10000);

            return dataLoop;
}*/

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

                            <BootPlayBarComponent> </BootPlayBarComponent>
                
                </div>
            </div>
        )
    }


}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps, { getBoothData })(BoothMainComponent);
