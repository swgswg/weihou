//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
const urlData = require('../../utils/urlData.js');
const funData = require('../../utils/functionMethodData.js');
const calculate = require('../../utils/calculate.js');
var page = 1;
var pageSize = 20;
var mystatus = -1;
Page({
    data: {
        glo_is_load:true,
        order:null,
        totalIncome: 0.0,
        runningMoney: 0.0,
        publicWelfareMoney: 0.0,
        hasData: false,
        all_order: -1,       // 全部
        pending_payment: 1,  // 1未付款
        to_be_shipped: 2,    // 2付款未发货(可退货)
        to_be_received: 3,   // 3付款待收货
        to_be_evaluated: 4,  // 4收货待评价(订单完成)
        accomplish: 5,       // 5评价完成
        exchange_goods: 6,   // 6换货
        return_of_goods: 7,  // 7退货
        navTab: ["全部", "待付款", "待发货", "待收货", "客户处理"],
        currentNavtab: 0,
        oederSearchInput:null, // 搜索订单号
        scrollTop: 0,
        floorstatus: false,
    },

    catchtouchstart: function (e) {
        let that = this;
        that.setData({
            startPoint: [e.touches[0].clientX, e.touches[0].clientY]
        })
    },


    /**
     * 拨打电话
     */
    // callEvent: function (e) {
    //     console.log(e)
    //     wx.makePhoneCall({
    //         phoneNumber: this.data.phoneNum
    //     })
    // },

    // 加载
    onLoad: function (options) {
        let that = this
        if (that.data.currentNavtab == 0) {
            mystatus = -1;
        }
        that.getOrder(mystatus, that, page, pageSize);
    },

    /**
     * 点击导航
     */
    switchTab: function (e) {
        let that = this;
        // console.log(e.currentTarget.dataset.idx);
        this.setData({
            currentNavtab: e.currentTarget.dataset.idx,
            floorstatus:false
        });
        that.statusOrder(e.currentTarget.dataset.idx,that);
    },

    // 查询各种状态的订单
    statusOrder:function(tabstatus,that){
        if (tabstatus == 0){
           mystatus = -1;
        } else if (tabstatus == 4){
            mystatus = 67;
        } else {
            mystatus = tabstatus;
        }
        // console.log(mystatus);
       that.getOrder(mystatus, that, page, pageSize);
    },

    // 查询订单
    getOrder: function (mystatus, that, page, pageSize){
        // 查询店铺订单
        funData.getOrder(app.globalData.shopCode, mystatus,page, pageSize, that, function(data) {
            // console.log(data.PageInfo.list);
            // 对订单数据格式的转化
            let order = funData.dealOrderData(data.PageInfo.list);
            // console.log(order);
            that.setData({
                order: order,
                hasData:true,
                glo_is_load:false
            });
        });
    },

    /**
     * 发货按钮
     */
    sendGoods:function(e){
        wx.navigateTo({
            url: '/pages/orderManage/sendGoods/sendGoods',
        })
    },

    // 改变状态 同步修改数据
    changeOrderStatus: function(index,mystatus,that){
        let order = that.data.order;
        let len = order.length;
        order[index].status = mystatus;
        that.setData({
            order:order
        });
    },

    /**
     * 查询订单详情
     */
    orderDetail:function(e){
        console.log(e.currentTarget.dataset.order_uuid);
        wx.navigateTo({
            url: '/pages/orderManage/orderDeatail/orderDeatail?order_uuid=' + e.currentTarget.dataset.order_uuid
        })
    },


    // 失去焦点获取输入值
    blurValue: function (e) {
        // console.log(e.detail.value);
        this.setData({
            oederSearchInput: e.detail.value
        });
    },

    /**
     * 搜索订单
     */
    oederSearch:function(){
        let that = this;
        wx.navigateTo({
            url: '/pages/orderManage/orderDeatail/orderDeatail?order_uuid=' + that.data.oederSearchInput
        })
    },
   
   /**
    * 换货详情按钮
    */
    exchangeGoods:function(e){
        wx.navigateTo({
            url: '/pages/orderManage/exchangeGoods/exchangeGoods?order_uuid=' + e.currentTarget.dataset.order_uuid
            // url: '/pages/orderManage/exchangeGoods/exchangeGoods'
            
        })
    },

    /**
     * 退货详情按钮
     */
    returnGoods:function(e){
        wx.navigateTo({
            url: '/pages/orderManage/returnGoods/returnGoods?order_uuid=' + e.currentTarget.dataset.order_uuid
            // url: '/pages/orderManage/returnGoods/returnGoods'

        })
    },

    /**
     *  查看物流详情
     */
    checkLogistics:function(e){
        wx.navigateTo({
            url: '/pages/orderManage/express/express?order_uuid=' + e.currentTarget.dataset.order_uuid
        })
    },

    /**
     * 滚动到底部/右边，会触发 scrolltolower 事件
     */
    scrollToLower:function(){
        let that = this;
        pageSize += 20;
        // console.log(pageSize);
        // console.log(mystatus)
        that.getOrder(mystatus, that, page, pageSize);
        that.setData({
            floorstatus: true
        })
    },

    /**
     * 返回顶部
     */
    goTop: function (e) {
        this.setData({
            scrollTop: 0
        })
    },  
})
