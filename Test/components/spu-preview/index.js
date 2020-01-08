// components/spu-preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  //监听器(处理标签数组)
  observers:{
    data:function(data){
      if (!data){
        return
      }
      if (!data.tags){
        return
      }
      const tags = data.tags.split('$')
      this.setData({
        tags
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onImgLoad:function (event) {
      const {width,height} = event.detail
      this.setData({
        w:340,
        h:height/width*340
      })
    }
  }
})
