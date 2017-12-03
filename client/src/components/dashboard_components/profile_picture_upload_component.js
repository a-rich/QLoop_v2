import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import { FILE_MANAGEMENT } from '../../types';
import { FileManagement } from '../../actions/filesdownload';
import ProfilePic from '../../profile_pic.jpg';


export class ProfilePictureUploadComponent extends Component {
    render() {
        return(
            <div>
                <input type="file" id="profile_pic" name="profile_pic" accept=".jpg, .jpeg, .png" onChange = {(event) => {console.log("file selected"); this.fileSelected(event)}}/>
            </div>
        )
    }

    fileSelected(fileSelected){
        var fileManager = new FileManagement();
        fileManager.profileImageUpload(fileSelected, (error)=>{
            if(error == null){
                console.log("upload success")
            }else{
                console.log("upload failed", error)
            }
        }, (progress)=>{
            console.log(progress)
        });
    }
}
