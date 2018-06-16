const app = getApp();
const util = require('../../../utils/util.js');
const urlData = require('../../../utils/urlData.js');
const funData = require('../../../utils/functionData.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        returnGoods:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        funData.getGoodBack(options.order_uuid, this, (data) => {
            // console.log(data);
            let returnGoods = Object.assign(data[0], data[1]);
            returnGoods.createTime = util.formatDate(returnGoods.createTime, 'YY-MM-DD hh:mm:ss');
            returnGoods.replyTime = util.formatDate(returnGoods.replyTime, 'YY-MM-DD hh:mm:ss');
            console.log(returnGoods)
            that.setData({
                returnGoods: returnGoods
            });
        });
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

    }
})