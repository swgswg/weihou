//获取应用实例
var app = getApp()
Page({
    data: {
        allMoney:'0.00',
        totalIncome: 0.0,
        runningMoney: 0.0,
        publicWelfareMoney: 0.0,
        orderNum: 123456789,
        payAmount: 0.0,
        payTime: '2017年2月16日  11:42',
        payType: '微信钱包',
        hasData: true,
        moneyInfo: [, , , , , , ,]
    },

    //滚动事件
    upper: function () {
        var self = this
        self.data.pageIndex = 1,
            wx.request({
                url: '',
                data: {
                },
                method: 'GET',
                success: function (res) {
                    self.setData({
                        // 清空数组

                    })
                }
            })
    },
    lower: function () {
        var self = this
        self.data.pageIndex = self.data.pageIndex + 1,
            wx.request({
                url: '',
                data: {
                },
                method: 'GET',
                success: function (res) {
                    self.setData({

                    })
                },
            })
    },

    goDeatailEvent: function () {
        wx.navigateTo({
            url: '../orderManage/orderDeatail/orderDeatail'
        })
    },

    // 加载
    onLoad: function (options) {
        var that = this
        

        //更新数据
        that.setData({
        })
    }
})