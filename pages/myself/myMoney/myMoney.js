//获取应用实例
var app = getApp();
const urlData = require('../../../utils/urlData.js');
const funData = require('../../../utils/functionData.js');
const util = require('../../../utils/util.js');
Page({
    data: {
        shopInfo: null,
    },

    // 全部提现
    allDeposit: function () {
        this.setData({
            deposit: this.data.shopInfo.pay_account
        })
    },

    // 加载
    onLoad: function (options) {
        var that = this
        // 获取商店信息
        funData.getShopByCode(app.globalData.shopCode, that, (data) => {
            console.log(data);
            let card = data.card;
            card.card_no = util.bankCardByStar(card.card_no);
            // console.log(shopInfo);
            that.setData({
                shopInfo: data.shop,
                card: card,
                hasData: true
            });
        });

        // 上一级页面是从银行卡列表页面跳转过来的  查询选择的银行卡
        // console.log(util.getPrevPageUrl());
        if (util.getPrevPageUrl() == 'pages/bankCard/bankCardList/bankCardList'){
            
            funData.getCardById(options.cid,that,(data)=>{
                console.log(data[0]);
                let card = data[0];
                card.card_no = util.bankCardByStar(card.card_no);
                console.log(card);
                let shopInfo = that.data.shopInfo;
                shopInfo.card = card;
                that.setData({
                    shopInfo: shopInfo
                });
            });
        }
    },
    onShow:function(){
        // 获取上级页面url
        // console.log(util.getPrevPageUrl());
        // if(util.getPrevPageUrl() == ""){
        //     this.onLoad();
        // }
        
    },

    // 更换银行卡
    changeBankCard:function(){
        wx.navigateTo({
            url: '/pages/bankCard/bankCardList/bankCardList',
        })
    },
})