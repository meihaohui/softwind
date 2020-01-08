/**
 * @Description:
 * @author Harry May(梅浩辉)
 * @date 2019/12/19
*/
import {Http} from "../utils/http";

class Activity {
    static locationD = 'a-2'
    static async getHomeLocationD(){
        return await Http.request({
            url:`activity/name/${Activity.locationD}`
        })
    }
}

export {
    Activity
}