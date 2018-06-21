//获取应用实例
var app = getApp();
const urlData = require('../../utils/urlData.js');
const funData = require('../../utils/functionData.js');
const util = require('../../utils/util.js');
Page({
    data: {
        shopInfo: 3000.00
    },

    // 全部提现
    allDeposit: function () {
        this.setData({
            deposit: this.data.balance
        })
    },

    // 加载
    onLoad: function () {
        var that = this
        // 获取商店信息
        funData.getShopByCode(app.globalData.shopCode, that, (data) => {
            // console.log(data);
            let card = data.card;
            card.card_no = util.bankCardByStar(card.card_no);
            // console.log(shopInfo);
            that.setData({
                shopInfo: data.shop,
                card: card,
                hasData: true
            });
        });

        //更新数据
        that.setData({
        })
    },

    // 更换银行卡
    changeBankCard:function(){
        wx.navigateTo({
            url: '/pages/bankCard/bankCardList/bankCardList',
        })
    },
})