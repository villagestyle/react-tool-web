import axios from './config';

export default {
    fileUpload: (data: FormData) => axios({
        method: 'post',
        url: 'file',
        data
    })
}