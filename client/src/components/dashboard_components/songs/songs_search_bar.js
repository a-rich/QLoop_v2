import React, { Component } from 'react'

import '../../../css/dashboard_components/booth_main_queue_component_css.css';

class SongsSearchBar extends Component {
    constructor(props){
        super(props);

        this.state = {term: ''};
    }

    render() {
        return (
            <div className="search-bar">
                <input
                    placeholder="Search"
                    id="search-bar"
                    value = {this.state.term}
                    onChange={event => this.onInputChange(event.target.value)} />
            </div>
        );
    }

    onInputChange(term){
        this.setState({term});
        this.props.onSearchtermChange(term);
    }
}

export default SongsSearchBar;