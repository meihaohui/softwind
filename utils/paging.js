/**
 * @Description:
 * @author Harry May(梅浩辉)
 * @date 2020/1/3
*/

import {Http} from "./http";

class Paging {

    start
    count
    req
    locker = false
    url
    moreData = true
    accumulator = []

    constructor(req,count=10,start=0) {
        this.start = start
        this.count = count
        this.req = req
        this.url = req.url
    }

    async getMoreData(){
        if (!this.moreData){
            return
        }
        if(!this._getLocker()){
            return
        }
        const data = await this._actualGetData()
        this._realeseLocker()//释放锁
        return data
    }

    async _actualGetData(){
        const req = this._getCurrentReq()
        let paging = await Http.request(req)
        if(!paging){
            return null
        }
        if(paging.total===0){
            return {
                empty:true,
                items:[],
                moreData:false,
                accumulator:[]
            }
        }

        this.moreData = Paging._moreData(paging.total_page,paging.page)
        if (this.moreData){
            this.start += this.count
        }
        this._accumulate(paging.items)
        return {
            empty: false,
            items: paging.items,
            moreData: this.moreData,
            accumulator: this.accumulator
        }
    }

    //结果集累加
    _accumulate(items){
        this.accumulator = this.accumulator.concat(items)
    }

    //此次请求是否带回数据
    static _moreData(totalPage,pageNum){
        return pageNum <totalPage-1
    }

    //获取当前请求
    _getCurrentReq(){
        let url = this.url
        const params = `start=${this.start}&count=${this.count}`
        if(url.includes('?')){
            url += '&'+params
        }else{
            url += '?'+params
        }
        this.req.url = url
        return this.req
    }

    _getLocker(){
        if(this.locker){
            return false
        }
        this.locker = true
        return true;
    }

    _realeseLocker(){
        this.locker = false
    }
}

export {
    Paging
}