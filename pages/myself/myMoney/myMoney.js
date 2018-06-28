//获取应用实例
var app = getApp();
const urlData = require('../../../utils/urlData.js');
const funData = require('../../../utils/functionMethodData.js');
const util = require('../../../utils/util.js');
Page({
    data: {
        shopInfo: null,
        card:null,
        deposit: '',
        owner: '',
    },

    // 加载
    onLoad: function (options) {
        var that = this;
        // 获取商店信息
        funData.getShopByCode(app.globalData.shopCode, that, (data) => {
            console.log(data);
            var card = null;
            if (util.getPrevPageUrl() == 'pages/myself/myself') {
                card = data.card;
                card.card_no = util.bankCardByStar(card.card_no);
                that.setData({
                    shopInfo: data.shop,
                    card: card,
                    hasData: true
                });
            } else if (util.getPrevPageUrl() == 'pages/bankCard/bankCardList/bankCardList') {
                // 上一级页面是从银行卡列表页面跳转过来的  查询选择的银行卡
                funData.getCardById(options.cid, that, (res) => {
                    // console.log(data[0]);
                    card = res[0];
                    // console.log(card);
                    card.card_no = util.bankCardByStar(card.card_no);
                    that.setData({
                        shopInfo: data.shop,
                        card: card,
                        hasData: true
                    });
                });
            }
        });

    },
    onShow: function () {

    },

    // 全部提现
    allDeposit: function () {
        // let deposit = this.data.shopInfo.pay_account;
        // console.log(deposit);
        let deposit = '0.00';
        if (this.data.shopInfo) {
            deposit = this.data.shopInfo.pay_account;
        } else {
            deposit = '0.00';
        }
        this.setData({
            deposit: deposit
        });
    },

    // 更换银行卡
    changeBankCard: function () {
        wx.navigateTo({
            url: '/pages/bankCard/bankCardList/bankCardList',
        })
    },

    // 持卡人姓名
    // ownerInput:function(e){
    //     let owner = e.detail.value;
    //     this.setData({
    //         owner: owner
    //     });
    // },

    // 提现金额
    withdrawPrice:function(e){
        let that = this;
        let deposit =e.detail.value;
        let price = Number(deposit);
        console.log()
        // 输入金额校验
        if(!util.checkReg(4, price)){
            wx.showToast({
                title: '请输入正确金额',
                icon: 'none',
                duration: 1000
            });
            return;
        }
        if (deposit > that.data.shopInfo.pay_account){
            wx.showToast({
                title: '超过可提现金额',
                icon: 'none',
                duration: 1000
            });
            return;
        }
        this.setData({
            deposit: deposit
        });
    },

    // 提现
    extract: function () {
        let that = this;
        let pay_account = that.data.shopInfo.pay_account;
        let deposit = that.data.deposit;
        // 提现金额验证
        if (deposit == '0.00' || deposit == '' ) {
            wx.showToast({
                title: '请输入提取金额',
                icon: 'none',
                duration: 2000
            });
            return;
        } else if (deposit > pay_account){
            wx.showToast({
                title: '提现金额过大',
                icon: 'none',
                duration: 2000
            });
            return;
        }

        if (that.data.owner != that.data.card.owner || that.data.owner == ''){
            // 持卡人姓名验证
            wx.showToast({
                title: '信息填写错误',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        let data = {
            shopCode:app.globalData.shopCode,
            card_no:that.data.card.card_no,
            price: that.data.deposit,
            owner:that.data.owner
        };
        console.log(data);
        funData.withdraw(app.globalData.shopCode, that.card.card_no, that.data.deposit, that.data.owner,that, ()=>{
            wx.showToast({
                title: '提现成功',
                icon: 'none',
                duration: 2000
            });
        });
    },

    /**
     * 查看明细
     */
    showDetail:function(){
        wx.navigateTo({
            url: '/pages/myself/myMoney/moneyDeatail/moneyDeatail',
        })
    },
})