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

        window.MediaSource = window.MediaSource || window.WebKitMediaSource;

        function onSourceOpen(e) {
          sourceBuffer = ms.addSourceBuffer('audio/mpeg');
          sourceBuffer.addEventListener('updateend', function() {
              if (queue.length) {
                  sourceBuffer.appendBuffer(queue.shift());
              }
          }, false);
        }

        var ms = new MediaSource();
        ms.addEventListener('sourceopen', onSourceOpen.bind(ms), false);
        var sourceBuffer = null;
        var queue = [];
        var start = true;
        var audio = document.querySelector('audio');
        audio.src = window.URL.createObjectURL(ms);

        //////////////////////////////////////////////////////////////
        // This part works by itself
        const socket = SocketIOClient('http://localhost:5000', {
            extraHeaders: {
                Authorization: localStorage.getItem('QLoopJWT')
            }
        });

        socket.on('connect', function (data) {
            console.log("Client connecting on booth join");
            console.log(data);
            socket.emit('join', {'booth_id': 1});
        });

        socket.on('connect', function() {
            socket.emit('join', {'booth_id': 1});
        });
        //////////////////////////////////////////////////////////////

        socket.on('new song', function() {
        });

        socket.on('song data', function(data) {
            if (start) {
                sourceBuffer.appendBuffer(data);
                start = false;
            } else {
                queue.push(data);
            }
        });

        this.state = {
            showSearch: true,
        }
    }

    componentWillMount () {
        this.props.getBoothData();
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

/*
<div className={"djs-queue-container w3-card-4"}>
                        <BoothDjListComponent> </BoothDjListComponent>
                    </div>
*/
    getData(data) {

    }

    render(){
        return(
            <div className={"main-wrapper"}>
                <div className={"grid-container"}>
                    <div className={"main-queue-container w3-card-4"}>
                        <BoothMainQueueComponent> </BoothMainQueueComponent>
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
                                ?<BoothSearchYtComponent getData={this.getData.bind(this)}> </BoothSearchYtComponent>
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
