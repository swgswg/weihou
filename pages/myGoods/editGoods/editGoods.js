const app = getApp();
const urlData = require('../../../utils/urlData.js');
const funData = require('../../../utils/functionData.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsInfo:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.goodsId);
       let that = this;
        // 获取商品详情
        funData.getGoodsDetails(options.goodsId, this, function(data){
            that.setData({
                goodsInfo:data
            });
        })
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
     * 获取表单提交的值
     */
    // formSubmit: function (e) {
    //     console.log(e.detail.value);
    //     let data = e.detail.value;
    //     data.shopCode = urlData.shopCode,
    //     // 修改商品
        
    // }
})