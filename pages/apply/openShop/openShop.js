const app = getApp();
const urlData = require('../../../utils/urlData.js');
const funData = require('../../../utils/functionData.js');
const util = require('../../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user_id:app.globalData.user_id,
        send_code:'点击获取验证码',
        disabled:false,
        tel:null,
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
     * 获取输入手机号
     */
    getTel:function(e){
        // console.log(e.detail.value)
        this.setData({
            tel:e.detail.value
        });
    },

    /**
     * 发送验证码
     */
    sendCode:function(){
        let that = this;
        // console.log(that.data.tel)
        // 验证手机号
        if (!util.checkReg(1, that.data.tel)) {
            wx.showToast({
                title: '手机号不正确',
                icon: 'none',
                duration: 1000
            });
            return;
        }

        let i = 120;
        let cleat_set = null;
        cleat_set = setInterval(function(){
            that.setData({
                send_code:'重新发送('+i+'s)',
                disabled:true,
            });
            i--;
            if(i < 0){
                clearInterval(cleat_set);
                that.setData({
                    send_code: '点击获取验证码',
                    disabled:false
                });
            }
        },1000);

    },

    /** 
     * 提交
     */
    openShop:function(e){
        // console.log(e.detail.value);
        let shop = e.detail.value;
        // 所有信息不能为空
        if (shop.owner == '' || shop.shop_name == '' || shop.mobile == '' || shop.code == '') {
            wx.showToast({
                title: '信息不能为空',
                icon: 'none',
                duration: 1000
            });
            return;
        }
        // 验证手机号
        if (!util.checkReg(1,shop.mobile)){
            wx.showToast({
                title: '手机号不正确',
                icon: 'none',
                duration: 1000
            });
            return;
        }
        if(shop.mobile != that.data.tel){
            wx.showToast({
                title: '手机号不正确',
                icon: 'none',
                duration: 1000
            });
            return;
        }
        shop.user_id = that.data.user_id;
        shop.level = 2;
        funData.insertShop(shop,that,(res)=>{
            wx.switchTab({
                url: '/pages/myself/myself'
            })
        });
    },
})