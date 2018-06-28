//获取应用实例
var app = getApp();
const urlData = require('../../utils/urlData.js');
const funData = require('../../utils/functionMethodData.js');
const util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        shopCode:app.globalData.shopCode,
        user_id:app.globalData.user_id,
        aliyunUrl: urlData.uploadFileUrl,
        shopInfo:null,
        group:null,
        ID_img:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        // 查询商家信息
        funData.getShopByCode(that.data.shopCode, that, (data) => {
            console.log(data);
            that.setData({
                shopInfo: data.shop,
            });
        });
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
        // console.log(e.detail.value)
        let that = this;
        let shop = e.detail.value;

        // 店铺分类不能为空
        if (shop.group_id == ''){
            wx.showToast({
                title: '分类不能为空',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        // 身份证号验证
        if (!checkReg(2,shop.ID_card)){
            wx.showToast({
                title: '身份证不正确',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        // 身份证照片不能为空
        if (that.data.ID_img == ''){
            wx.showToast({
                title: '上传身份证照片',
                icon: 'none',
                duration: 2000
            });
            return;
        }

        shop.ID_img = that.data.ID_img;
        shop.shop_code = app.globalData.shopCode;
        shop.user_id = that.data.user_id;
        shop.level = 3;
        // console.log(shop)
        funData.updateShopInfo(shop, that, ()=>{
            wx.showToast({
                title: '信息已成功提交',
                icon: 'success',
                duration: 2000
            });
            setInterval(function(){
                wx.switchTab({
                    url: '/pages/pages/myself/myself'
                })
            },2000)
        });
    }

})