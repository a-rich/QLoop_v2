import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import YTSearch from 'youtube-api-search';

import { API_KEY } from '../../types';
import "../../css/booth_components/booth_search_yt_component.css";
import SongsSearchBar from'./songs_search_bar';
import { enqueue } from '../../actions/queue';

class BoothSearchYtComponent extends Component{
    constructor(){
        super();
        this.state = {
            songObjects: [],
            selectedSong: null
        }
        this.songSearch('despacito');
        this.submit = this.submit.bind(this);
    }

    songSearch(term) {
        YTSearch({key: API_KEY, term: term, videoCategoryId: 10, type:"video"}, (songs) => {
            this.setState({
                songObjects: songs,
                selectedSongs: songs
            });
        });
    }

    render(){
        const songSearch = _.debounce((term) => { this.songSearch(term) }, 500);
        return(
        
            <div className={"my-yt-search-full-size"}>
            
                <div className= {"my-yt-search-non-scrollable"}>
                
                    <span key= {0}> {"Song Search : "} 
                    <SongsSearchBar onSearchtermChange={(term) => songSearch(term)} id="search-bar" />
                    <br/>
                    </span>
                </div>
                <li></li>
                <div className= {"my-yt-search-scrollable"}>
                    {this.generateMySearchCardsJSX()}

                </div>
            </div>
        );

    }
    generateMySearchCardsJSX(){
        var resultArr = this.state.songObjects.map((item)=>{ 
            return(
            <div className={"my-yt-search-item w3-card"}>
                    <div className={"my-yt-search-item-grid"}>
                        <div className="my-yt-search-title-container">
                             <span className = {"my-yt-search-song-title"}>{item.snippet.title}</span>
                        </div>
                        <button className={"my-yt-search-item-button-add w3-card-2"} 
                            onClick={() => { this.submit(item)}
                        }></button>

                    </div>
                </div>
        )
        });
        return resultArr;
        
    }

    submit(item) {
        this.props.enqueue(item.id)
    }
    
    /*setMySearchObject(songObjects){
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
    }*/

}
export default connect(null, { enqueue })(BoothSearchYtComponent);
