/**
 * @Description:
 * @author Harry May(梅浩辉)
 * @date 2019/12/18
*/
import {Http} from "../utils/http";

class Category {
    static async getHomeLoctionC(){
        return await Http.request({
            url:`category/grid/all`
        })
    }
}

export {
    Category
}