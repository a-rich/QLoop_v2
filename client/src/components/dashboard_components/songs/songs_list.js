import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import SongsListItem from './songs_list_item'
import SongsSearchBar from './songs_search_bar';
import { mapper } from '../../../utils/misc';
import '../../../css/dashboard_components/booth_main_queue_component_css.css';

class SongsList extends Component {
    constructor(props){
        super(props);

        this.state = {
            songs: [],
            searched: false,
        };

        this.songSearch('');
    }

    songSearch(term){
        if (term === "") {
            this.setState({ searched: false })
            return{};
        }

        const stateSongs = [];
        const songs = this.props.songs
        const request = {
            query: term
        }

        for(let i=0; i<songs.length; i++) {
            if(songs[i].name.includes(term)){
                stateSongs.push(songs[i])
            }
        }

        this.setState({ 
            searched: true,
            songs: stateSongs
        });
    }

    favoriteSongsRender() {
        var resultJSX = this.props.songs.map(song => {
            return(
                <div key = {song.name}>
                    <div>
                        <SongsListItem
                            removeFavoriteSong={this.props.removeFavoriteSong}
                            song={song}
                            songs={this.props.songs}
                        />
                    </div>
                </div>
            );
        });
        return resultJSX
    }

    searchedSongsRender() {
        var resultJSX = this.state.songs.map(song => {
            return(
                <div key = {song.name}>
                    <div>
                        <SongsListItem
                            removeFavoriteSong={this.props.removeFavoriteSong}
                            song={song}
                            songs={this.props.songs}
                        />
                    </div>
                </div>
            );
        });
        return resultJSX
    }

    render() {
        const songSearch = _.debounce((term) => { this.songSearch(term) }, 500);

        return(
            <div>
                <h3>Songs:</h3>
                <SongsSearchBar className="padding" onSearchtermChange={(term) => songSearch(term)} />
                <div className={"main-list-scrollable"}>
                    {this.state.searched? this.searchedSongsRender() : this.favoriteSongsRender()}
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    var songs ={};

    if(!state.credentials.jwt) {
        return{}
    }
    if (!state.credentials.data.favorite_songs) {
        songs = {};
    } else {
        songs = mapper(state.credentials.data.favorite_songs);
    }

    return {
        songs: songs
    }
}

export default connect (mapStateToProps)(SongsList);
