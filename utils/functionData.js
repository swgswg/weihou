const urlData = require('./urlData.js');
const util = require('./util.js');
const calculate = require('./calculate.js');
const app = getApp();
module.exports = {
    /**
     * wx.request二次封装
     */
    myWxRequest: function(myurl,mydata,mysufun){
        wx.request({
            url: myurl,
            method: 'POST',
            data: mydata,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                if (res.data.state == 1){
                    mysufun(res.data);
                } else {
                    wx.showToast({
                        icon:'none',
                        title: '您的网络太差'
                    });
                }
            }
        });
    },

    /**
     * wx.request二次封装
     */
    requestUrl: function (data, url, pageobj,callback) {
		wx.request({
			url: url,
			data: data,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
			success: function(res) {
				if (res.data.state == 1) {
					callback.apply(pageobj, [res.data.data])
				} else {
					wx.showModal({
						title: '提示',
						content: '网络请求失败',
						showCancel: false
					})
				}
			},
			complete: function() {}
		})
	},
	httpRequest: function(data, url, callback, pageobj) {
		wx.request({
			url: url,
			data: data,
			header: {
				'Content-Type': 'application/json'
			},
			success: function(res) {
				if (res.statusCode != 200) {
					wx.showModal({
						title: '提示',
						content: "error:接口请求错误",
						showCancel: false
					})
				} else {
					callback.apply(pageobj, [res.data]);
					if (res.data.status != 2 && res.data.status != 1) {
						wx.showModal({
							title: '提示',
							content: res.data.msg,
							showCancel: false
						})
					}
				}
			},
			fail: function() {
				wx.showModal({
					title: '提示',
					content: "error:网络请求失败",
					showCancel: false
				})
			}
		})
	},
    
	// getShareData: function(mmodule, callback, pageobj) {
	// 	let that = this;
	// 	let data = {
	// 		token: urlData.duoguan_user_token,
	// 		mmodule: mmodule,
	// 		_: Date.now()
	// 	};
	// 	let res = this.requestUrl(data, urlData.duoguan_get_share_data_url, callback, pageobj)
	// },

    // 查询商品列表(默认上架)
    getGoods: function (page, pageSize, pageobj,callback) {
        let that = this;
        let data = {
            shopCode: app.globalData.shopCode,
            page: page,
            pageSize: pageSize,
            isUse:1,
        };
        this.requestUrl(data, urlData.getGoodsUrl, pageobj,callback);
    },
	
    // 添加商品
    insertGoods: function (data){
        this.requestUrl(data, urlData.insertGoodsUrl, pageobj, callback);
    },  
    // 修改商品
    // 删除商品
    // 查询商品详情
    getGoodsDetails: function (goodsid,pageobj, callback){
        this.requestUrl({ goodsId: goodsid }, urlData.getGoodsDetailsUrl, pageobj, callback);
    },
    // 上架/下架商品 0下架,1上架
    deleteGoods: function (goodsid, isuse, pageobj, callback){
        let data = {
            goodsId: goodsid, 
            isUse: isuse,
        };
        this.requestUrl(data, urlData.deleteGoodsUrl, pageobj, callback);
    },
    // 查询分组
    getGroup: function (pageobj, callback){
        this.requestUrl({}, urlData.getGroupUrl, pageobj, callback);
    },
    // 查询分类
    getClass: function (groupid,pageobj, callback) {
        let data = {
            groupId: groupid
        }
        this.requestUrl(data, urlData.getClassUrlyu, pageobj, callback);
    },
    // 查询商品对应的评论
    getComment: function (goodsid, pageobj, callback){
        let data = {
            goodsId: goodsid
        }
        this.requestUrl(data, urlData.getCommentUrl, pageobj, callback);
    },

    // 查询订单(查店铺的订单)
    getOrder: function (shopCode,mystatus, pageobj, callback) {
        let data = {
            shop_code: shopCode,
            status:mystatus
        }
        this.requestUrl(data, urlData.getOrderUrl, pageobj, callback);
    },

    // 修改订单状态
    updateOrderStatus: function (orderMainid, mystatus, pageobj, callback){
        let data = {
            order_mainid: orderMainid,
            status: mystatus
        }
        this.requestUrl(data, urlData.updateOrderStatusUrl, pageobj, callback);
    },

    // 查询订单详情
    getOrderDetail: function (orderuuid, pageobj, callback){
        let data = {
            order_uuid: orderuuid
        }
        this.requestUrl(data, urlData.getOrderDetailUrl, pageobj, callback);
    },

    // 对订单数据的处理
    dealOrderData:function(data){
        let order = [];
        let k = 0;
        // 将订单号相同的合并为一个数组
        for (let i = 0; i < data.length; i++) {
            data[i].createTime = util.formatDate(data[i].createTime, 'YY-MM-DD hh:mm:ss');
            order[k] = [];
            order[k].push(data[i]);
            for (let j = i + 1; j < data.length; j++) {
                if (data[i].order_uuid == data[j].order_uuid) {
                    order[k].push(data[j]);
                    data.splice(j, 1);
                }
            }
            k++;
        }
        // console.log(order);
        // 将每个数组转化为对象
        let orderlen = order.length;
        for (let n = 0; n < orderlen; n++) {
            order[n] = { goods: order[n] };
        }
        // 把每个订单的独有部分提出来
        let order_len = order.length;
        for (let i = 0; i < order_len; i++) {
            order[i].order_uuid = order[i].goods[0].order_uuid;
            order[i].createTime = order[i].goods[0].createTime;
            order[i].addr_receiver = order[i].goods[0].addr_receiver;
            order[i].addr_mobile = order[i].goods[0].addr_mobile;
            order[i].area_path = order[i].goods[0].area_path;
            order[i].real_money = order[i].goods[0].real_money;
            order[i].status = order[i].goods[0].status;
            order[i].order_mainid = order[i].goods[0].order_mainid;
            let sum = 0;
            let goods_len = order[i].goods.length;
            for (let j = 0; j < goods_len; j++) {
                order[i].goods[j].sum = calculate.calcMul(order[i].goods[j].num, order[i].goods[j].price);
                sum = calculate.calcAdd(sum, order[i].goods[j].sum);
            }
            order[i].sumPrice = sum;
        }
        return order;
    },

    //  查询退换货
    getGoodBack: function (orderuuid, pageobj, callback){
        let data = {
            order_uuid: orderuuid
        }
        this.requestUrl(data, urlData.getGoodBackUrl, pageobj, callback);
    },













}   



