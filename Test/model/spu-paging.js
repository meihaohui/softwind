/**
 * @Description:
 * @author Harry May(梅浩辉)
 * @date 2019/12/29
*/
import {Paging} from "../utils/paging";

class SpuPaging{
    static getLatestPaging(){
        return new Paging({
            url: `spu/latest`
        },3)
    }
}

export {
    SpuPaging
}
