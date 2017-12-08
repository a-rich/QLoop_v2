import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createPublicBooth } from '../../actions/createBooth';
import { Image } from 'react-bootstrap';
import "../../css/createBooth/create_booth.css";

class CreateBoothComponent extends Component{
    constructor(){
        super();
        this.state = {
            selectedOption: ""
        }
    }

    handleRadioChange(changeEvent){
        this.setState({
            selectedOption: changeEvent.target.value
        });
    }

    createBooth(){
        const request = {
            access_level : this.state.selectedOption
        };
        this.props.createPublicBooth(request, () => {
            this.props.history.push('/booths/booth');
        });
    }

    render(){
        return(
            <div className={"create-booth-main-wrapper"}>
                <div className={"create-booth-grid-container"}>
                    <div className={"create-booth-container w3-card-4"}>
                    
                    <div className="create-booth-title">Create a Booth</div>
                    <div className="form-container">
                        <form>
                            <div className="radio">
                            <label>
                                <input type="radio" value="open" onChange={this.handleRadioChange.bind(this)} name="create-booth-option-radio" />
                                Public
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" value="password"  onChange={this.handleRadioChange.bind(this)} name="create-booth-option-radio" />
                                Password protected
                            </label>
                            {
                                this.state.selectedOption === "password" ? 
                                    <div>
                                        Password:
                                        <input type="text" name="password"/><br/>
                                    </div> 
                                    : 
                                    <div> </div>
                            }
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" value="friends" onChange={this.handleRadioChange.bind(this)} name="create-booth-option-radio"/>
                                Friends Only
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" value="invite" onChange={this.handleRadioChange.bind(this)} name="create-booth-option-radio"/>
                                Invite Only
                            </label>
                            {
                                this.state.selectedOption === "invite" ? 
                                    <div>
                                        Email:
                                        <input type="email" name="email"/><br/>
                                    </div> 
                                    : 
                                    <div> </div>
                            }
                            </div>
                        </form>
                    </div>
                    <div className={"button-container"}> 
                        <button className={"cancel"} >Cancel</button>
                        <button className={"create"} onClick={this.createBooth.bind(this)} >Create</button>
                    </div>
                    
                    </div> 
                </div>  
            </div> 
        )
    }
}
export default connect(null, { createPublicBooth })(CreateBoothComponent);