import axios from 'axios';

import { FILE_MANAGEMENT } from '../types';
import { ROOT_URL } from '../types';


export class FileManagement{


    profileImageUpload(file, callback, progress){
        var fileInfo = file.target.files[0]
        var data = new FormData()

        data.append('files', fileInfo)

        var config = {
            // headers: {'content-type': 'multipart/form-data' },
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