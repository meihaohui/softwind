import {Http} from "../utils/http";

/** @作者 梅浩辉 **/

//业务对象

class Theme {
    static locationA = 't-1'
    static locationE = 't-2'
    static locationF = 't-3'
    static locationH = 't-4'

    themes = []

    async getThemes(){
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
        this.themes = await Http.request({
            url:`theme/by/names`,
            data:{
                names
            }
        })
    }

    async getHomeLocationA() {
        return this.themes.find(t => t.name === Theme.locationA)
    }

    async getHomeLocationE(){
        return this.themes.find(t => t.name === Theme.locationE)
    }

    async getHomeLocationF(){
        return this.themes.find(t => t.name === Theme.locationF)
    }

    async getHomeLocationH(){
        return this.themes.find(t => t.name === Theme.locationH)
    }

    static async getHomeLocationESpu(){
        return Theme.getThemeSpuByName(Theme.locationE)
    }

    static async getThemeSpuByName(name) {
        return await Http.request({
            url: `theme/name/${name}/with_spu`
        });
    }
}

export {
    Theme
}