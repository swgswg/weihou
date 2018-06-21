const app = getApp();
const urlData = require('../../../utils/urlData.js');
const funData = require('../../../utils/functionData.js');
let page = 1;
let pageSize = 20;
Page({
    data: {
        goods_data: null,
        isUse:1,
        notUse:0,
        this_cate_id: 0,
        this_keywords: '',
        this_page_size: 1,
        this_page_num: 10,
        glo_is_load: true,
        select_type: 'shangjia',
        sheng_jiang: 0, 
        is_select_shangjia:false,
        is_select_xiajia:false,
        is_select_haoping: false,
        is_select_xiaoliang: false,
        is_loadmore: true,
        scrollTop: 0,
        floorstatus: false,
        aliyunUrl: urlData.uploadFileUrl
    },
    goTop: function (e) {
        this.setData({
            scrollTop: 0
        })
    },
    pay_scroll: function (e, res) {
        if (e.detail.scrollTop > 50) {
            this.setData({
                floorstatus: true
            });
        } else {
            this.setData({
                floorstatus: false
            });
        }
    },
    onLoad: function (options) {
        var that = this;
        // var this_cate_id = options.cid;
        // var this_keywords = options.keywords;
        // that.setData({ this_cate_id: this_cate_id, this_keywords: this_keywords });

        // 查询商品列表
        funData.getGoods(page,pageSize,this,(data) => {
            // console.log(data);
            let goods_info = data.PageInfo.list;
            let len = goods_info.length;
            for(let i = 0; i < len; i++){
                goods_info[i].perfectRate = (~~goods_info[i].perfect / ~~goods_info[i].comment_num) * 100 + '%';
            }
            // console.log(goods_info);
            that.setData({
                goods_data: goods_info,
                glo_is_load: false
            });
        });
    },
    onShow: function () {
        // var that = this;
        // var requestData = {};
        // requestData.cid = that.data.this_cate_id;
        // requestData.pagesize = 1;
        // requestData.pagenum = that.data.this_page_num;
        // requestData.keywords = that.data.this_keywords;
        // requestData.stype = that.data.select_type;
        // requestData.stype_jiage = that.data.select_jiage_type;
    },

    /**
     * 继续加载数据
     */
    onReachBottom: function (e) {
        let that = this;
        wx.showNavigationBarLoading();
        if (that.data.is_loadmore == false) {
            wx.hideNavigationBarLoading();
            return false;
        }
        pageSize += 20;
        // var this_cate_id = that.data.this_cate_id;
        let searchData = {
            shopCode: app.globalData.shopCode,
            pageSize : pageSize,
            page : page,
            isUse : 1,
        };
        
        switch (that.data.select_type){
            case 'shangjia':
                searchData. isUse = 1;
                break;
            case 'xiajia':
                searchData.isUse = 0;
                break;
            case 'xiaoliang':
                searchData.salesNum = that.data.sheng_jiang;
                break;
            case 'haoping':
                searchData.commentNum = that.data.sheng_jiang;
            break;
        }
       
        that.selectFun(searchData);

    },

    /**
     * 条件查询
     */
    select_goods_list: function (e) {
        let that = this;
        let s_type = e.currentTarget.dataset.stype;
        that.setData({ sheng_jiang: '' });
        let data = {
            shopCode: app.globalData.shopCode,
            page: page,
            pageSize: pageSize,
            isUse:1,
        };
        // 升2,降1
        switch (s_type){
            case 'shangjia':
                that.setData({ 
                    sheng_jiang: 2, 
                    is_select_shangjia: true 
                });
                data.isUse = 1;  // 上架1
                break;
            case 'xiajia':
                that.setData({ 
                    sheng_jiang: 1, 
                    is_select_xiajia: true 
                });
                data.isUse = 2;  // 下架2
                break;
            case 'xiaoliang':
                if (that.data.is_select_xiaoliang == true) {
                    that.setData({ 
                        sheng_jiang: 1, 
                        is_select_xiaoliang: false 
                    });
                } else {
                    that.setData({ 
                        sheng_jiang: 2, 
                        is_select_xiaoliang: true 
                    });
                }
                data.salesNum = that.data.sheng_jiang;
                break;
            case 'haoping':
                if (that.data.is_select_haoping == true) {
                    that.setData({ 
                        sheng_jiang: 1, 
                        is_select_haoping: false 
                    });
                } else {
                    that.setData({ 
                        sheng_jiang: 2, 
                        is_select_haoping: true 
                    });
                }
                data.commentNum = that.data.sheng_jiang;
                break;
            case 'shenhe':
                data.isUse = 0; // 未上架,审核中
                break;
            case 'qiangzhixiajia':
                data.isUse = 3;  // 禁止上架,强制下架
        }
        that.setData({ 
            select_type: s_type, 
            this_page_size: 1, 
            is_loadmore: true 
        });
        // console.log(that.data.select_type);
        // console.log(that.data.sheng_jiang);

        that.selectFun(data);
    },

    /**
     * 条件查询方法
     */
    selectFun: function (data){
        let that = this;
        // 条件查询商品列表
        funData.requestUrl(data, urlData.getGoodsUrl, this, (data) => {
            // console.log(data);
            that.setData({
                goods_data: data.PageInfo.list,
                glo_is_load: false
            });
        });
    },

    /**
     * 删除商品
     */
    deleteGoods:function(e){
        let that= this;
        wx.showModal({
            title: '删除商品',
            content: '确定删除此件商品吗',
            success: function (res) {
                if (res.confirm) {
                    let goodsId = e.currentTarget.dataset.goodsid;
                    // console.log(goodsId);
                    
                } else if (res.cancel) {
                    
                }
            }
        })
    },
    
    /**
     * 修改商品
     */
    editGoods:function(e){
        let that = this;
        wx.showModal({
            title: '修改商品',
            content: '确定修改此件商品吗',
            success: function (res) {
                if (res.confirm) {
                    let goodsId = e.currentTarget.dataset.goodsid;
                    console.log(goodsId);
                    wx.navigateTo({
                        url: '/pages/myGoods/editGoods/editGoods?goodsId='+goodsId,
                    })
                } else if (res.cancel) {

                }
            }
        })
    },

    /**
     * 下架商品
     */
    notUseGoods:function(e){
        let that = this;
        wx.showModal({
            title: '下架商品',
            content: '确定下架此件商品吗',
            success: function (res) {
                if (res.confirm) {
                    let goodsId = e.currentTarget.dataset.goodsid;
                    // console.log(goodsId);
                    // 下架商品
                    funData.deleteGoods(goodsId, that.data.notUse, that, () => {
                        wx.showToast({
                            title: '下架成功',
                            icon: 'success',
                            duration: 1000,
                            success:function(){
                                let index = e.currentTarget.dataset.index;
                                that.changeGoods_data(index,that);
                            }
                        });
                    });
                } else if (res.cancel) {

                }
            }
        })
    },

    /**
     * 上架商品
     */
    isUseGoods:function(e){
        let that = this;
        wx.showModal({
            title: '上架商品',
            content: '确定上架此件商品吗',
            success: function (res) {
                if (res.confirm) {
                    let goodsId = e.currentTarget.dataset.goodsid;
                    // console.log(goodsId);
                    if(e.currentTarget.dataset.stock <= 0){
                        wx.showToast({
                            title: '库存为0,上架失败',
                            icon: 'none',
                            duration: 1000,                          
                        });
                        return;
                    }
                    // 上架商品
                    funData.deleteGoods(goodsId, that.data.isUse, that, () => {
                        wx.showToast({
                            title: '上架成功',
                            icon: 'success',
                            duration: 1000,
                            success: function () {
                                let index = e.currentTarget.dataset.index;
                                that.changeGoods_data(index,that);
                            }
                        });
                    });
                } else if (res.cancel) {

                }
            }
        })
    },

    // 动态删除商品数量
    changeGoods_data:function(index,that){
        console.log(index);
        let goods_data = that.data.goods_data;
        let len = goods_data.length;
        goods_data.splice(index, 1);
        that.setData({
            goods_data: goods_data
        });
    },

})