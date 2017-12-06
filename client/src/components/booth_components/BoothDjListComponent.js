import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import "../../css/booth_components/booth_dj_list_component.css";
import inviteDjOverlay from '../overlays/invite_dj_overlays/invite_dj_overlay';


class BoothDjListComponent extends Component{
    constructor(){
        super();
        this.state = {
            userObjects: []
        }
        this.createFakeUserObjects();
      
    }
    
    render(){
        return(
            <div className={"dj-queue-full-size"}>
               
                       
                        <div className={"dj-title-item-nonscrollable-grid w3-card"}>
                        <div className="dj-title-non-scrollable container">
                        
                            Djs 
                        </div>
                        <div className= {"invite-button-container"}>
                        <button onClickonClick={<inviteDjOverlay/>} className ={"dj-list-item-button-invite-DJ w3-card-2"}>Invite DJ</button>
                        </div>
                       
                        </div>
                        
                        

                        <div className= {"dj-queue-scrollable"}>
                            {this.generateDjCardsJSX()}
                        
                </div>
                
            </div>
       
        );
    }
    generateDjCardsJSX(){
        var resultArr = this.state.userObjects.map((item, i )=>{ return(
            <div className={"dj-queue-item w3-card"}>
            <div className={"dj-list-item-grid"}>
                <div className="dj-list-container">
                    <span className = {"dj-list-user"}>{item.dj}</span>
                </div>      
                <button className={"dj-list-item-button-skip w3-card-2"} onClick={this.skipUser.bind(this, item)}> </button>
            </div>

        
        </div>
        )
        });
        console.log(resultArr)
        return resultArr;
        
    }
    skipUser(userObject){
        console.log("skipping ", userObject.dj);
    }
    setUserObject(userObjects){
        var temp_state = this.state;
        temp_state.userObjects = userObjects;
        this.state = (temp_state);
    }
    createFakeUserObjects(){
        var userObjects = [
            {
                
                dj: "bishalw"
            },
            {
                
                dj: "bipulw"
            },
            {
                
                dj: "haldiraam"
            },
            {
                
                dj: "stevieJ"
            },
            {
                
                dj: "billyG"
            },
            {
                
                dj: "alexR"
            },
            {
               
                dj: "raghavGoo"
            }
        ];
        console.log(userObjects);
        this.setUserObject(userObjects);
        
    }
    
}

export default BoothDjListComponent;