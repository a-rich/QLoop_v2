import React, { Component } from 'react';
import { Image , Table } from 'react-bootstrap';
import "../../css/booth_components/booth_main_queue_component.css";

class BoothMainQueueComponent extends Component{
    constructor(){
        super();
        this.state = {
            musicObjects: []
        }
        // sleep(1);
        //TODO (h) :- Populating with fake data replace with real server call;
        this.createFakeMusicObjects();
        
    }
    
    render(){
        return(
            <div className={"main-queue-full-size"}>
                
                <div className= {"main-queue-non-scrollable"}>
                    Song Queue:
                </div>

                <div className= {"main-queue-scrollable"}>
                        {this.generateMusicCardsJSX()}
                </div>

            </div>
        );
    }

    generateMusicCardsJSX(){
        var resultArr = this.state.musicObjects.map((item, i)=>{ return(
            <div className={"main-queue-item w3-card"}>
            <div className={"main-queue-item-grid"}>
                <div className="main-queue-title-container">
                    <span className = {"main-queue-song-title"}>{item.title}</span>
                    <br/><span className = {"main-queue-user-label"}> by Dj {item.dj}</span>
                </div>

                <button className={"main-queue-item-button-skip w3-card-2"} onClick={this.skipMusic.bind(this, item)}> </button>
                <button className={"main-queue-item-button-save w3-card-2"} onClick={this.saveMusic.bind(this, item)}> </button>    
            </div>
        </div>
        )
        });
        console.log(resultArr)
        return resultArr;
    }

    skipMusic(musicObject){
        //TODO (H): skip Song And Reset State
        console.log("skipping: ", musicObject.title);
    }


    saveMusic(musicObject){
        //TODO (H): save Song And Reset State
        console.log("saving: ", musicObject.title);
    }

    setMusicObject(musicObjects){
        var temp_state = this.state;
        temp_state.musicObjects = musicObjects;
        this.state =(temp_state);
    }

    createFakeMusicObjects(){
        var musicObjects = [
            {
                title: "OK, Its Alright With Me - Eric Hutchinson",
                dj: "bishalw"
            },
            {
                title: "Motorsport - Migos",
                dj: "bipulw"
            },
            {
                title: "Flex Like Ouu - Lil Pump",
                dj: "haldiraam"
            },
            {
                title: "How To Save A Life - Fray",
                dj: "stevieJ"
            },
            {
                title: "Tone It Down - Gucci Mane",
                dj: "billyG"
            },
            {
                title: "Questions - Chris Brown",
                dj: "alexR"
            },
            {
                title: "Element - Kendrick Lamar",
                dj: "raghavGoo"
            }
        ];
        console.log(musicObjects);
        this.setMusicObject(musicObjects);
        
    }
}

export default BoothMainQueueComponent;