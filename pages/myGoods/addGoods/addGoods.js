const app = getApp();
const urlData = require('../../../utils/urlData.js');
const funData = require('../../../utils/functionData.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        category: null,
        list_img: [],
        list_img_hidden: true,
        swiper_img: [],
        swiper_img_hidden: true,
        goodsDetail_img: [],
        goodsDetail_img_hidden: true,
        aliyunUrl: urlData.uploadFileUrl
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        // 查询分类
        funData.getClass(app.globalData.groupId, that, function (data) {
            // console.log(data);
            that.setData({
                category: data
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
     * 添加商品列表图片
     */
    addlistImg: function () {
        let that = this;
        let list_img = that.data.list_img;
        let list_img_hidden = that.data.list_img_hidden;
        funData.myUpload(function (newsrc, fileNmae) {
            list_img.push(fileNmae);
            if (list_img.length >= 1) {
                list_img_hidden = !list_img_hidden;
            }
            that.setData({
                list_img: list_img,
                list_img_hidden: list_img_hidden
            });
        });
    },

    /**
     * 添加商品轮播图片,规定三张
     */
    addswiperImg: function () {
        let that = this;
        let swiper_img = that.data.swiper_img;
        let swiper_img_hidden = that.data.swiper_img_hidden;
        funData.myUpload(function (newsrc, fileNmae) {
            swiper_img.push(fileNmae);
            if (swiper_img.length >= 3) {
                swiper_img_hidden = !swiper_img_hidden;
            }
            that.setData({
                swiper_img: swiper_img,
                swiper_img_hidden: swiper_img_hidden
            });
        });
    },

    /**
     * 添加商品详情图片,规定4张
     */
    addgoodsDetailImg: function () {
        let that = this;
        let goodsDetail_img = that.data.goodsDetail_img;
        let goodsDetail_img_hidden = that.data.goodsDetail_img_hidden;
        funData.myUpload(function (newsrc, fileNmae) {
            goodsDetail_img.push(fileNmae);
            if (goodsDetail_img.length >= 4) {
                goodsDetail_img_hidden = !goodsDetail_img_hidden;
            }
            that.setData({
                goodsDetail_img: goodsDetail_img,
                goodsDetail_img_hidden: goodsDetail_img_hidden
            });
        });

    },

    /**
     * 删除图片
     */
    cancleImg: function (e) {
        let that = this;
        let status = e.currentTarget.dataset.status;
        let index = e.currentTarget.dataset.index;
        let data = null;
        if (status == '1') {
            data = that.data.list_img;
            data.splice(index, 1);
            that.setData({
                list_img: data,
                list_img_hidden: true
            });
        } else if (status == '2') {
            data = that.data.swiper_img;
            data.splice(index, 1);
            that.setData({
                swiper_img: data,
                swiper_img_hidden: true
            });
        } else if (status == '3') {
            data = that.data.goodsDetail_img;
            data.splice(index, 1);
            that.setData({
                goodsDetail_img: data,
                goodsDetail_img_hidden: true
            });
        }

    },

    /**
     * 获取表单提交的值
     */
    formSubmit: function (e) {
        // console.log(e.detail.value);
        let that = this;
        let goods = e.detail.value;
        let list_img = that.data.list_img;
        let swiper_img = that.data.swiper_img;
        let goodsDetail_img = that.data.goodsDetail_img;
        let status = ''; // 存放图片的状态, 列表图1,轮播图2,详情图3
        let img = '';    // 存放图片
        // 商品列表图
        let list_img_len = list_img.length;
        for (let i = 0; i < list_img_len; i++) {
            img += list_img[i] + ',';
            status += '1,'
        }
        // 商品轮播图
        let swiper_img_len = swiper_img.length;
        for (let i = 0; i < swiper_img_len; i++) {
            img += swiper_img[i] + ',';
            status += '2,'
        }
        // 商品详情图
        let goodsDetail_img_len = goodsDetail_img.length;
        for (let i = 0; i < goodsDetail_img_len; i++) {
            img += goodsDetail_img[i] + ',';
            status += '3,'
        }
        goods.img = img;
        goods.status = status;
        console.log(goods);
        // 添加商品
        funData.insertGoods(data, that, ()=>{
            wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 1000
            });
        });
    },
});
