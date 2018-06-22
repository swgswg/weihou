//获取应用实例
const app = getApp();
const urlData = require('../../utils/urlData.js');
const funData = require('../../utils/functionData.js');
const util = require('../../utils/util.js');
let page = 1;
let pageSize = 20;
Page({
    data: {
        glo_is_load:true,
        allMoney:'0.00',
        totalIncome: '0.00',
        runningMoney: 0.0,
        publicWelfareMoney: 0.0,
        orderNum: 123456789,
        payAmount: 0.0,
        payTime: '2017年2月16日  11:42',
        payType: '微信钱包',
        hasData: false,
        moneyInfo: [, , , , , , ,],

    },

   

    // 加载
    onLoad: function (options) {
        let that = this
        
        // 查询售卖总金额
        funData.getOrderMoney(app.globalData.shopCode, that, (data)=>{
            // console.log(data);
            that.setData({
                totalIncome:data,
                hasData:true,
                glo_is_load: false,
            });
            
        });

        // 查询每笔订单的金额
        that.getOneOrderMoney(page, pageSize,that);
    },

    //滚动事件
    // upper: function () {
    //     var self = this
    //     self.data.pageIndex = 1,
    //         wx.request({
    //             url: '',
    //             data: {
    //             },
    //             method: 'GET',
    //             success: function (res) {
    //                 self.setData({
    //                     // 清空数组

    //                 })
    //             }
    //         })
    // },

    /**
     * 滚动到底部,会触发 scrolltolower 事件
     */
    lower: function (e) {
        // console.log(e)
        let that = this;
        pageSize += 20;
        console.log(pageSize)
        // 查询每笔订单的金额
        that.getOneOrderMoney(page, pageSize, that);

    },

    /**
     * 跳转订单详情
     */
    goOrderDetail: function (e) {
        let order_uuid = e.currentTarget.dataset.order_uuid;
        wx.navigateTo({
            url: '../orderManage/orderDeatail/orderDeatail?order_uuid=' + order_uuid
        })
    },


    // 查询每笔订单的金额
    getOneOrderMoney: function (page, pageSize ,that){
        funData.getOneOrderMoney(app.globalData.shopCode, page, pageSize, that, (data) => {
            // console.log(data.PageInfo.list);
            let moneyInfo = data.PageInfo.list;
            let len = moneyInfo.length;
            for (let i = 0; i < len; i++) {
                moneyInfo[i].createTime = util.formatDate(moneyInfo[i].createTime, 'YY-MM-DD hh:mm:ss');
            }
            that.setData({
                moneyInfo: moneyInfo
            });
        });
    },

})