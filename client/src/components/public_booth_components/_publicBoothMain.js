import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Image} from 'react-bootstrap';
import { fetchBooths } from '../../actions/createBooth';

import PublicConformationPageOverlay from '../overlays/public_booth_overlays/public_conformation_page_overlay';
import "../../css/public_booth_components/public_booth_main.css"

class CreatePublicBoothComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            boothObjects: []
        }

        console.log("just before calling fetch booths in public booths constructor");
        this.props.fetchBooths();
        console.log("just after calling fetch booths in public booths constructor");
    }

    joinBooth(data){
        this.props.joinBooth(data, () => {
            this.props.history.push('/booths/booth/1');
        });
    }

    render(){
        return(
            <div className={"main-wrapper"}>
                    <div className={"grid-container"}>

                            <div className={"create-public-booth-container w3-card-4"}>

                                <div className= {"public-booth-non-scrollable"}>

                                Public Booths

                                </div>
                                    <div className= {"public-booth-scrollable"}>
                                        {this.generateListOfBoothsJSX()}

                                </div>

                        </div>


                    </div>
            </div>

        );

    }

    generateListOfBoothsJSX(){
        var resultArr = this.state.boothObjects.map((item, i)=>{ return(
            /*<div className= {"cardViewForContent-grid w3-card-4"}>
            <div className={"public-list-item-grid"}>

            <div className="public-list-container">
                <span className = {"main-queue-song-in-progress"}>{item.title}</span>
                <br/><span className = {"public-booth-creator"}> Creator : {item.creator}</span>
            </div>
        </div>
        </div>*/
            <PublicConformationPageOverlay item={item}/>
        )
        });
        console.log(resultArr)
        return resultArr;
    }
    setBoothObject(boothObjects){
        var temp_state = this.state;
        temp_state.boothObjects = boothObjects;
        this.state = (temp_state);
    }
    createFakeBoothObjects(){
        var boothObjects = [
            {
                title: "OK, Its Alright With Me - Eric Hutchinson",
                creator: "bishalw"
            },
            {
                title: "Motorsport - Migos",
                creator: "bipulw"
            },
            {
                title: "Flex Like Ouu - Lil Pump",
                creator: "haldiraam"
            },
            {
                title: "How To Save A Life - Fray",
                creator: "stevieJ"
            },
            {
                title: "Tone It Down - Gucci Mane",
                creator: "billyG"
            },
            {
                title: "Questions - Chris Brown",
                creator: "alexR"
            },
            {
                title: "Element - Kendrick Lamar",
                creator: "raghavGoo"
            },
            {
                title: "Element - Kendrick Lamar",
                creator: "raghavGoo"
            },
            {
                title: "Element - Kendrick Lamar",
                creator: "raghavGoo"
            },
            {
                title: "Element - Kendrick Lamar",
                creator: "raghavGoo"
            }
        ];
        console.log(boothObjects);
        this.setBoothObject(boothObjects);

    }
}
export default connect(null, { fetchBooths })(CreatePublicBoothComponent);
