// pages/home/home.js
// noinspection BadExpressionStatementJS
import {config} from "../../config/config";
import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";
import {Activity} from "../../model/activity";
import {Paging} from "../../utils/paging";
import {SpuPaging} from "../../model/spu-paging";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        themeE: null,
        bannerB: null,
        grid: [],
        activityD: null,
        themeESpu: null,
        themeF: null,
        themeH: null,
        bannerG: null,
        spuPaging: null,
        loadingType:'loading'
    },

    async onLoad(options) {
        this.initAllData()
        this.initBottomSpuList()
    },

    async initBottomSpuList() {
        const paging = SpuPaging.getLatestPaging()
        this.data.spuPaging = paging
        const data = await paging.getMoreData()
        if (!data) {
            return
        }
        wx.lin.renderWaterFlow(data.items)
    },

    async initAllData() {
        const theme = new Theme()
        await theme.getThemes()

        const themeA = await theme.getHomeLocationA();
        const themeE = await theme.getHomeLocationE();
        let themeESpu = []
        if (themeE.online) {
            const data = await Theme.getHomeLocationESpu()
            if (data) {
                themeESpu = data.spu_list.slice(0, 8)
            }
        }
        const themeF = await theme.getHomeLocationF();
        const themeH = await theme.getHomeLocationH();
        const bannerB = await Banner.getHomeLocationB();
        const grid = await Category.getHomeLoctionC();
        const activityD = await Activity.getHomeLocationD();
        const bannerG = await Banner.getHomeLocationG();
        this.setData({
            themeA,
            themeE,
            themeESpu,
            bannerB,
            grid,
            activityD,
            themeF,
            bannerG,
            themeH
        })
    },

    onPullDownRefresh: function () {

    },

    onReachBottom: async function () {
        const data = await this.data.spuPaging.getMoreData()
        if (!data) {
            return
        }
        wx.lin.renderWaterFlow(data.items)
        if (!data.moreData) {
            this.setData({
                loadingType: 'end'
            })
        }
    },

    onShareAppMessage: function () {

    }
})