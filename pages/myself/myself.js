//获取应用实例
var app = getApp();
const urlData = require('../../utils/urlData.js');
const funData = require('../../utils/functionData.js');
const util = require('../../utils/util.js');

Page({
    data: {
        shopInfo: null,
        card:null,
        profile:'',
        money: [],
        hasData: false,
        isHidden: true,
        hide: "hide",
        noHid: "noHid",
        aliyunUrl: urlData.uploadFileUrl
    },
    /**
     * 我的钱包
     */
    showMoney: function () {
        wx.navigateTo({
            url: '../myself/myMoney/myMoney'
        })
    },

    setEvent: function () {
        this.setData({
            isHidden: !this.data.isHidden
        })
        // console.log(this.data.isHidden)
    },

    /**
     * 客服
     */
    callKeHu: function () {
        wx.makePhoneCall({
            phoneNumber: '17733689080'
        })
    },

    /**
     * 修改密码
     */
    modifyPassword: function () {
        this.setData({
            isHidden: !this.data.isHidden
        }),
        wx.navigateTo({
            url: '../myself/modifyPassword/modifyPassword'
        })
    },

    /**
     * 使用说明
     */
    directionsForUse: function () {
        this.setData({
            isHidden: !this.data.isHidden
        }),
        wx.navigateTo({
            url: '../myself/directionsForUse/directionsForUse'
        })
    },

    /**
     * 反馈
     */
    feedBack: function () {
        this.setData({
            isHidden: !this.data.isHidden
        }),
        wx.navigateTo({
            url: '../myself/feedBack/feedBack'
        })
    },

    /**
     * 退出登录
     */
    loginOut: function () {
        this.setData({
            isHidden: !this.data.isHidden
        })
        // wx.navigateTo({
        //   url: '../login/login'
        // })
        // wx.navigateBack({
        //   delta: 1
        // })
        wx.redirectTo({
            url: '../login/login'
        })
    },


    // 加载
    onLoad: function () {
        var that = this
        // 查询商家信息
        funData.getShopByCode(app.globalData.shopCode, that, (data)=>{
            // console.log(data);
            let card = data.card;
            // let card = String(shopInfo.card_no);
            // let len = card.length;
            // shopInfo.card_no = '*'.repeat(len - 4) + card.slice(len - 4);
            // console.log(card.card_no);
            card.card_no = util.bankCardByStar(card.card_no);
            // console.log(shopInfo);
            that.setData({
                shopInfo: data.shop,
                card: card,
                hasData:true
            });
        });
       
    },

    /**
     * 修改商家logo
     */
    editProfile:function(){
        let that = this;
        funData.myUpload(function (newsrc, fileNmae){
            console.log(newsrc,fileNmae);
            let shopInfo = that.data.shopInfo;
            shopInfo.logo = fileNmae; 
            that.setData({
                shopInfo: shopInfo
            })
            // 同步修改数据库
            funData.updateInfoLogo(app.globalData.shopCode, fileNmae,that, ()=>{});
        });
    },

    /**
     * 修改商家信息按钮
     */
    editShopInfo:function(){
        this.setData({
            isHidden: !this.data.isHidden
        }),
        wx.navigateTo({
            url: '/pages/myself/editShopInfo/editShopInfo'
        })
    },

    /**
     * 查看绑定的银行卡
     */
    showBankCard:function(){
        wx.navigateTo({
            url: '/pages/bankCard/bankCardList/bankCardList',
        })
    },
})