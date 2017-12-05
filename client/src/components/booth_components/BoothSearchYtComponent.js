import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import "../../css/booth_components/booth_search_yt_component.css";

class BoothSearchYtComponent extends Component{
    constructor(){
        super();
        this.state = {
        songObjects: []
        }
        this.createFakeSearchObjects();
    }

    render(){
        return(
        
            <div className={"my-yt-search-full-size"}>
            
                <div className= {"my-yt-search-non-scrollable"}>
                
                    <span key= {0}> {"Song Search : "} <br/>
                    </span>
                </div>
                <div className= {"my-yt-search-scrollable"}>
                    {this.generateMySearchCardsJSX()}

                </div>
            </div>
        );

    }
    generateMySearchCardsJSX(){
        var resultArr = this.state.songObjects.map((item, i )=>{ return(
            <div className={"my-yt-search--item w3-card"}>
                    <div className={"my-yt-search-item-grid"}>
                        <div className="my-yt-search-title-container">
                             <span className = {"my-yt-search-song-title"}>{item.title}</span>
                        
                        </div>
                        <button className={"my-yt-serach-item-button-add w3-card-2"}onClick={this.addSongToQueue.bind(this, item)}></button>

                    </div>

                         
                </div>
        )
        });
        console.log(resultArr)
        return resultArr;
        
    }
    addSongToQueue(songObject){
        console.log("adding",songObject.title);

    
    }
    setMySearchObject(songObjects){
        var temp_state = this.state;
        temp_state.songObjects = songObjects;
        this.state = (temp_state);
    }
    createFakeSearchObjects(){
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
        this.setMySearchObject(songObjects);
    }

}
export default BoothSearchYtComponent;
