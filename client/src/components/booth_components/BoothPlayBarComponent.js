import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import "../../css/booth_components/booth_playbar_component.css";

class BoothPlayBarComponent extends Component{
    constructor(){
        super();
        this.onclickFav();
    }

    onclickFav(){

    }
    render(){
        return(
            <div className={"play-bar-containers-grid w3-card"}>
                <div className = "play-bar-item-containers">
                
                <div className =  {"play-bar-item-song w3-card"}>Let it go - Frozen
            
                </div>
                <button className={"play-bar-item-fav"} >fav</button>
                <button className={"play-bar-item-skip"} >skip</button>
                <button className={"play-bar-item-soundtoggle"} >sound</button>
            

                
                {/* <div className = {"play-bar-item-fav w3-card"}> 
                <div className ={"play-bar-item-fav w3-button"}>
                
                
                </div>

               
                </div> 
                
               
                <div className =   {"play-bar-item-skip w3-card"}>
                <div className ={"play-bar-item-skip w3-button"}>
                
                
                </div>
                
                
                
                </div> */}
            </div>

            </div>
        )   
    }

}
export default BoothPlayBarComponent;

