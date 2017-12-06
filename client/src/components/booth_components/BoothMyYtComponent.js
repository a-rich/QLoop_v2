import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import "../../css/booth_components/booth_my_yt_component.css";

class BoothMyYtComponent extends Component{
    constructor(){
        super();
        this.state = {
            songObjects: []
        }
        this.createFakeQueueMusicObjects();
    }
    
    render(){
        return(
            <div className={"my-yt-queue-full-size"}>
            
                <div className= {"my-yt-queue-non-scrollable"}>
                
                    <span key= {0}> {"My Queue : "} <br/>
                    </span>
                    
                </div>
                <div className= {"my-yt-queue-scrollable"}>
                {this.generateMyQueueCardsJSX()}

                </div>
            </div>

            
        );
    }
    generateMyQueueCardsJSX(){
        var resultArr = this.state.songObjects.map((item, i )=>{ return(
            <div className={"my-yt-queue-item w3-card"}>
                    <div className={"my-yt-queue-item-grid"}>
                        <div className="my-yt-queue-title-container">
                             <span className = {"my-yt-queue-song-title"}>{item.title}</span>
                        
                        </div>
                        <button className={"my-yt-queue-item-button-remove w3-card-2"}onClick={this.deleteSongFromQueue.bind(this, item)}></button>

                    </div>

                         
                </div>
        )
        });
        console.log(resultArr)
        return resultArr;
        
    }
    deleteSongFromQueue(songObject){
        console.log("deleting",songObject.title);

    
    }
    setMyMusicObject(songObjects){
        var temp_state = this.state;
        temp_state.songObjects = songObjects;
        this.state = (temp_state);
    }
    createFakeQueueMusicObjects(){
        var songObjects = [
            {
                title: "OK, Its Alright With Me - Eric Hutchinson"
            },
            {
                title: "Motorsport - Migos"
            },
            {
                title: "Flex Like Ouu - Lil Pump"
            },
            {
                title: "How To Save A Life - Fray"
            },
            {
                title: "OK, Its Alright With Me - Eric Hutchinson"
            }
            

        ];
        console.log(songObjects);
        this.setMyMusicObject(songObjects);
    }


}

export default BoothMyYtComponent;