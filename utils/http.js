import {config} from "../config/config";
import { promisic } from "../miniprogram_npm/lin-ui/utils/util";

class Http {
    static async request({
                             url,
                             data,
                             method='GET'
    }){
       const res = await promisic(wx.request)({
            url:`${config.apiBaseUrl}${url}`,
            data,
            method,
            header:{
                appkey:config.appkey
            }
        })
        return res.data
    }
}

// promisic(wx.request)({
//     url:'',
//     data:data,
// })
// promisic(wx.getStorage)

export {
    Http
}