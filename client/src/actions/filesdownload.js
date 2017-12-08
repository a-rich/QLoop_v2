import axios from 'axios';

import { ROOT_URL, FILE_MANAGEMENT } from '../types';
import * as GeneralUtils from "../utils/GeneralUtils";

export class FileManagement{


    profileImageUpload(file, callback, progress){
        var fileInfo = file.target.files[0]
        var data = new FormData()
        var user = GeneralUtils.getCurrentUser()
        if(user == null){
            callback(new Error('User Not Logged In'))
            return
        }else{
            console.log("User logged in", user)
        }
        data.append('files', fileInfo)
        data.append("user", user)
        
        var config = {
            withCredentials: true,
            onUploadProgress: function(progressEvent) {
                var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                progress(percentCompleted);
            }
            
        }

        axios.post(`${ROOT_URL}/api/users/edit_profile/`, data, config).then( (res) => {
            console.log(res);
            if (res.errors == null) {
                callback(null)
            }else{
                callback(res.errors)
            }
        }).catch( (err) => {
            callback(err)
        })
    }
}
