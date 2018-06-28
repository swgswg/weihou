var app = getApp();
const urlData = require('../../../utils/urlData.js');
const funData = require('../../../utils/functionMethodData.js');
const util = require('../../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bank:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    /**
     * 选择银行
     */
    selectBank: function (e) {
        this.setData({
            bank: e.currentTarget.dataset.bank
        });
    },

    /**
     * 添加银行卡
     */
    addBankCard: function (e) {
        let that = this;
        let cardInfo = e.detail.value;
        // 所有信息不能为空
        if (cardInfo.owner == "" || cardInfo.mobile == "" || cardInfo.ID_card == "" || cardInfo.card_no == "" || that.data.bank == ""){
            wx.showToast({
                title: '请填写正确信息',
                icon: 'none',
                duration: 1000
            })
            return;
        }
        console.log(cardInfo);
        // 验证身份证和银行卡号
        if ((!util.checkReg(2, cardInfo.ID_card)) || (!util.checkReg(3, cardInfo.card_no))) {
            wx.showToast({
                title: '请填写正确信息',
                icon: 'none',
                duration: 1000
            })
            return;
        } else if (that.data.bank  == ''){
            wx.showToast({
                title: '请选择正确开户行',
                icon: 'none',
                duration: 1000
            })
            return;
        } 
        
        // 添加银行卡
        funData.insertCard(
            app.globalData.shopCode, 
            cardInfo.owner, 
            cardInfo.ID_card, 
            cardInfo.card_no, 
            cardInfo.mobile,
            that.data.bank,
            that, () => {
            wx.showToast({
                title: '添加银行卡成功',
                icon: 'success',
                duration: 1000
            });
            setTimeout(function(){
                wx.redirectTo({
                    url: '/pages/bankCard/bankCardList/bankCardList',
                })
            },1000)
        });
    },

    
})