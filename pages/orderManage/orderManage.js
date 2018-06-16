//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
const urlData = require('../../utils/urlData.js');
const funData = require('../../utils/functionData.js');
const calculate = require('../../utils/calculate.js');
var page = 1;
var pageSize = 20;
Page({
    data: {
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
    },

    catchtouchstart: function (e) {
        let that = this;
        that.setData({
            startPoint: [e.touches[0].clientX, e.touches[0].clientY]
        })
    },

    catchtouchend: function (e) {
        let that = this;
        let currentNum = parseInt(this.data.currentNavtab);

        // that.endX = e.changedTouches[0].clientX;
        // that.endY = e.changedTouches[0].clientY;

        // if(that.endX  - that.startX > 10 && currentNum > 0){
        //   currentNum -= 1;
        // }

        // if(that.endX - that.startX < -10 && currentNum< this.data.navTab.length -1){
        //   currentNum=currentNum + 1;
        // }

        let endPoint = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
        let startPoint = that.data.startPoint
        if (endPoint[0] <= startPoint[0]) {
            if (Math.abs(endPoint[0] - startPoint[0]) >= Math.abs(endPoint[1] - startPoint[1]) && currentNum < this.data.navTab.length - 1) {
                currentNum = currentNum + 1;
            }
        } else {
            if (Math.abs(endPoint[0] - startPoint[0]) >= Math.abs(endPoint[1] - startPoint[1]) && currentNum > 0) {
                currentNum -= 1;
            }
        }

        this.setData({
            currentNavtab: currentNum
        });
    },

    /**
     * 拨打电话
     */
    callEvent: function (e) {
        console.log(e)
        wx.makePhoneCall({
            phoneNumber: this.data.phoneNum
        })
    },

    // 加载
    onLoad: function (options) {
        let that = this
        if (that.data.currentNavtab == 0) {
            var mystatus = -1;
        }
        that.getOrder(mystatus,that);
    },

    /**
     * 点击导航
     */
    switchTab: function (e) {
        let that = this;
        // console.log(e.currentTarget.dataset.idx);
        this.setData({
            currentNavtab: e.currentTarget.dataset.idx
        });
        that.statusOrder(e.currentTarget.dataset.idx,that);
    },

    // 查询各种状态的订单
    statusOrder:function(mystatus,that){
       if(mystatus == 0){
           mystatus = -1;
       } else if(mystatus == 4){
            mystatus = 67;
        }
        console.log(mystatus);
        that.getOrder(mystatus,that);
    },

    // 查询订单
    getOrder: function (mystatus,that){
        // 查询店铺订单
        funData.getOrder(app.globalData.shopCode, mystatus, that, function(data) {
            //  console.log(data);
            // 对订单数据格式的转化
            let order = funData.dealOrderData(data);
            // console.log(order);
            that.setData({
                order: order,
                hasData:true
            });
        });
    },

    /**
     * 发货按钮
     */
    sendGoods:function(e){
        let that = this;
        wx.showModal({
            title: '发货',
            content: '是否确认发货',
            success: function (res) {
                if (res.confirm) {
                    wx.showToast({
                        title: '发货成功',
                        icon: 'success',
                        duration: 1000,
                        success:function(){
                             // 同步改变数据库订单状态
                            funData.updateOrderStatus(e.currentTarget.dataset.order_mainid, that.data.to_be_received, that,()=>{
                                // 同步改变页面订单状态
                                that.changeOrderStatus(e.currentTarget.dataset.index,that.data.to_be_received,that);
                            });
                        }
                    });
                   
                } else if (res.cancel) {
                    wx.showToast({
                        title: '取消发货',
                        icon: 'none',
                        duration: 1000
                    });
                }
            }
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
})
