//获取应用实例
const app = getApp();
const util = require('../../../utils/util.js');
const urlData = require('../../../utils/urlData.js');
const funData = require('../../../utils/functionData.js');
const calculate = require('../../../utils/calculate.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        express:null,
        express_error:null,
        express_num:null,
        express_name: null,
        express_number:null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let order_uuid = options.order_uuid;
        // console.log(order_uuid);

        funData.getTransInfo(order_uuid,that,(data)=>{
            console.log(data);
            that.setData({
                express_name: data.shortName,
                express_number: data.transNO
            });
            funData.inquiryExpress(data.shortName, data.transNO,function(res){
                console.log(res);
                if(res.message == 'ok'){
                    that.setData({
                        express:res.data,
                        express_num:res.data.length
                    });
                } else {
                    that.setData({
                        express_error: res.message
                    });
                }
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