//获取应用实例
var app = getApp();
const urlData = require('../../utils/urlData.js');
const funData = require('../../utils/functionData.js');
const util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        aliyunUrl: urlData.uploadFileUrl,
        group:null,
        ID_img:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        // 获取店铺分类
        funData.getGroup(that,(data)=>{
            console.log(data)
            that.setData({
                group : data
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

    },

    /**
     * 添加照片
     */
    addImg:function(){
        let that = this;
        funData.myUpload(function (newsrc, fileNmae){
            that.setData({
                ID_img:fileNmae
            });
        });
    },

    /**
     * 提交
     */
    apply:function(e){
        console.log(e.detail.value)
        let that = this;
        let shop = e.detail.value;
        shop.ID_img = that.data.ID_img;
        shop.user_id = app.globalData.user_id;
        funData.insertShop(shop, that, ()=>{
            wx.showToast({
                title: '信息已成功提交',
                icon: 'success',
                duration: 2000
            });
            setInterval(function(){
                wx.redirectTo({
                    url: '/pages/apply/auditing/auditing'
                })
            },2000)
        });
    }

})