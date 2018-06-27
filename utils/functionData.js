const urlData = require('./urlData.js');
const util = require('./util.js');
const calculate = require('./calculate.js');
const env = require('../weixinFileToaliyun/env.js');
const uploadAliyun = require('../weixinFileToaliyun/uploadAliyun.js');
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
     * wx.request二次封装 post请求
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
					callback.apply(pageobj, [res.data.data]);
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
    
    /**
     * 上传图片二次封装
     */
    myUpload: function (sufun){
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            // 上传文件
            success: function (res) {
                // console.log(res)
                let tempFilePaths = res.tempFilePaths;
                // 临时文件路径
                let filePath = tempFilePaths[0];
                let ext = filePath.slice(filePath.lastIndexOf('.')+1);
                let extArr = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'tiff'];
                // console.log(extArr.indexOf(ext));
                if (extArr.indexOf(ext) != -1) {
                    // 上传文件
                    uploadAliyun(filePath, function (fileNmae) {
                        let newsrc = env.aliyunServerURL + fileNmae;
                        // console.log(env.aliyunServerURL);
                        // console.log(newsrc);
                        // that.setData({
                        //     profile: newsrc
                        // });
                        sufun(newsrc, fileNmae);
                        // 头像上传数据库
                        // util.myWxRequest(app.globalData.updateUserInfoPhotoUrl, { photo: fileNmae }, function (res) {
                        //     wx.showToast({
                        //         icon: 'success',
                        //         title: '修改成功'
                        //     });
                        // })
                    }, function () { });
                } else {
                    wx.showToast({
                        title: '图片格式不正确',
                        icon: 'none'
                    })
                }
            }
        })
    },

    /**
     * 查询快递
     */
    inquiryExpress: function (mytype, mypostid, mysufun){
        switch (mytype){
            case '中通':
            case '中通快递': 
                mytype = 'zhongtong';
                break;
            case '申通':
            case '申通快递': 
                mytype = 'shentong';
                break;
            case '韵达':
            case '韵达快递': 
                mytype = 'yunda';
                break;
            case '圆通':
            case '圆通快递': 
                mytype = 'yuantong';
                break;
            case '顺丰':
            case '顺丰快递':
                mytype = 'shunfeng';
                break;
        }   
        // let mydata = {
        //     type: 'zhongtong',
        //     // postid:211119071939
        //     postid:210772407168

        //     // temp:0.14004732217384586
        // };
        wx.request({
            url: 'http://www.kuaidi100.com/query',
            method: 'GET',
            data: {
                type:mytype,
                postid:mypostid
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                // console.log(res);
                // if (res.data.message == 'ok') {
                //     mysufun(res.data.data);
                // } else {
                //     mysufun(res.data.message);
                //     // wx.showToast({
                //     //     icon: 'none',
                //     //     title: res.data.message
                //     // });
                // }
                mysufun(res.data);
            }
        });
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
    insertGoods: function (data, pageobj, callback){
        this.requestUrl(data, urlData.insertGoodsUrl, pageobj, callback);
    },  

    // 查询商品详情
    getGoodsDetails: function (goodsid,pageobj, callback){
        this.requestUrl({ goodsId: goodsid }, urlData.getGoodsDetailsUrl, pageobj, callback);
    },
    // 上架/下架商品 0审核,1上架,2下架,3强制下架,4删除  // 修改商品   // 删除商品
    deleteGoods: function (goodsid, isuse, pageobj, callback){
        let data = {
            goodsId: goodsid, 
            isUse: isuse,
        };
        this.requestUrl(data, urlData.deleteGoodsUrl, pageobj, callback);
    },

    // 修改商品信息
    // updateGoods: function (goodsid, mygoods_name, mygoods_details, myprice, mystock, myimg, mystatus, pageobj, callback){
    updateGoods: function (data, pageobj, callback){
        // let data = {
        //     goodsId: goodsid,
        //     goods_name: mygoods_name,
        //     goods_details: mygoods_details,
        //     price: myprice,
        //     stock: mystock,
        //     img:myimg,
        //     status:mystatus
        // };
        this.requestUrl(data, urlData.updateGoodsUrl, pageobj, callback);
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
        this.requestUrl(data, urlData.getClassUrl, pageobj, callback);
    },
    // 查询商品对应的评论
    getComment: function (goodsid, pageobj, callback){
        let data = {
            goodsId: goodsid
        }
        this.requestUrl(data, urlData.getCommentUrl, pageobj, callback);
    },

    // 查询订单(查店铺的订单)
    getOrder: function (shopCode, mystatus, mypage, mypageSize, pageobj, callback) {
        let data = {
            shop_code: shopCode,
            status:mystatus,
            page:mypage,
            pageSize:mypageSize
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
        // console.log(data);
        let order = [];
        let k = 0;
        // 将订单号相同的合并为一个数组
        for (let i = 0; i < data.length; i++) {
            // data[i].createTime = util.formatDate(data[i].createTime, 'YY-MM-DD hh:mm:ss');
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
                order[i].goods[j].sum = calculate.calcMul(order[i].goods[j].num, order[i].goods[j].goodsPrice);
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

    // 查询售卖总金额
    getOrderMoney: function (shopCode, pageobj, callback){
        let data = {
            shop_code: shopCode
        }
        this.requestUrl(data, urlData.getOrderMoneyUrl, pageobj, callback);
    },

    // 查询每笔订单的金额
    getOneOrderMoney: function (shopCode, mypage, mypageSize, pageobj, callback){
        let data = {
            shop_code: shopCode,
            page:mypage,
            pageSize: mypageSize
        }
        this.requestUrl(data, urlData.getOneOrderMoneyUrl, pageobj, callback);
    },

    // 按天查询订单金额
    getMoneyByDay: function (shopCode, myyear, mymonth, pageobj, callback){
        let data = {
            shop_code: shopCode,
            year:myyear,
            month:mymonth
        }
        this.requestUrl(data, urlData.getMoneyByDayUrl, pageobj, callback);
    },

    // 按月查询订单金额
    getMoneyByMonth: function (shopCode, myyear, pageobj, callback) {
        let data = {
            shop_code: shopCode,
            year: myyear,
        }
        this.requestUrl(data, urlData.getMoneyByDayUrl, pageobj, callback);
    },

    // 修改商家logo信息
    updateInfoLogo: function (shopCode, mylogo, pageobj, callback){
        let data = {
            shop_code: shopCode,
            logo: mylogo,
        }
        this.requestUrl(data, urlData.updateInfoUrl, pageobj, callback);
    },

    // 修改商家信息 名称,手机,地址
    updateInfo: function (shopCode, myshop_name, myshop_addr, mymobile, pageobj, callback){
        let data = {
            shop_code: shopCode,
            shop_name: myshop_name,
            shop_addr: myshop_addr,
            mobile: mymobile
        }
        this.requestUrl(data, urlData.updateInfoUrl, pageobj, callback);
    },

    // 完善商家信息
    updateShopInfo: function (data, pageobj, callback){
        // let data = {
        //     shop_code: shopCode,
        //     shop_detail: myshop_detail,
        //     ID_card: myID_card,
        //     shop_tip: myshop_tip,
        //     ID_img: myID_img,
        //     group_id: mygroup_id,
        //     level: 3
        // }
        this.requestUrl(data, urlData.updateInfoUrl, pageobj, callback);
    },

    // 查询商家信息
    getShop: function (shopCode, pageobj, callback){
        let data = {
            shop_code: shopCode,
            page:1,
            pageSize:1
        }
        this.requestUrl(data, urlData.getShopUrl, pageobj, callback);
    },

    // 查看单个商店信息
    getShopByCode: function (shopCode, pageobj, callback){
        let data = {
            shop_code: shopCode,
        }
        this.requestUrl(data, urlData.getShopByCodeurl, pageobj, callback);
    },

    // 查所有银行卡
    getCardByCode: function (shopCode, pageobj, callback){
        let data = {
            shop_code: shopCode,
        }
        this.requestUrl(data, urlData.getCardByCodeUrl, pageobj, callback);        
    },

    // 根据id查银行卡
    getCardById: function (mycid, pageobj, callback){
        let data = {
            cid: mycid,
        }
        this.requestUrl(data, urlData.getCardByCodeUrl, pageobj, callback);        
    },

    // 设为默认银行卡
    updateCardDefault: function (cid, pageobj, callback){
        let data = {
           cid: cid,
        }
        this.requestUrl(data, urlData.updateCardDefaultUrl, pageobj, callback);     
    },

    // 添加银行卡
    insertCard: function (shopCode, myowner, myID_card, mycard_no, mymobile, mybank, pageobj, callback){
        let data = {
            shop_code: shopCode,
            owner: myowner,
            ID_card: myID_card,
            card_no: mycard_no,
            mobile:mymobile,
            bank:mybank
        }
        this.requestUrl(data, urlData.insertCardUrl, pageobj, callback);     
    },

    // 删除银行卡
    deleteCard: function (mycard_id, pageobj, callback){
        let data = {
            card_id: mycard_id
        }
        this.requestUrl(data, urlData.deleteCardUrl, pageobj, callback);   
    },

    // 添加物流信息
    insertTransInfo: function (myorder_uuid, mytransNO, myshortName, pageobj, callback){
        let data = {
            order_uuid: myorder_uuid,
            transNO: mytransNO,
            shortName: myshortName,
            status:3
        }
        this.requestUrl(data, urlData.insertTransInfoUrl, pageobj, callback);   
    },

    // 获取单个物流信息
    getTransInfo: function (myorder_uuid, pageobj, callback){
        let data = {
            order_uuid: myorder_uuid,
        }
        this.requestUrl(data, urlData.getTransInfoUrl, pageobj, callback);   
    },

    // 查询收藏商店的用户
    getUserByCode: function (shopCode, pageobj, callback){
        let data = {
            shop_code: shopCode,
        }
        this.requestUrl(data, urlData.getUserByCodeUrl, pageobj, callback);   
    },

    // 商家提现
    withdraw: function (shopCode, mycard_no, myprice, myowner, pageobj, callback){
        let data = {
            shop_code: shopCode,
            card_no: mycard_no,
            price: myprice,
            owner: myowner
        }
        this.requestUrl(data, urlData.withdrawUrl, pageobj, callback);   
    },

    // 查询提现记录
    getWithdrawal: function (shopCode, mystatus, mypage, mypageSize, pageobj, callback){
        let data = {
            shop_code: shopCode,
            status: mystatus,
            page: mypage,
            pageSize: mypageSize
        }
        this.requestUrl(data, urlData.getWithdrawalUrl, pageobj, callback);   
    },

    // 修改退换货状态
    updateBackStatus: function (myorder_uuid, pageobj, callback){
        let data = {
            order_uuid: myorder_uuid
        }
        this.requestUrl(data, urlData.updateBackStatusUrl, pageobj, callback);   
    },

    // 商店注册
    insertShop: function (data, pageobj, callback){
        // let data = {
        //     owner: myowner,
        //     shop_name:myshop_name,
        //     shop_detail:myshop_detail,
        //     user_id: myuser_id
        // }
        this.requestUrl(data, urlData.insertShopUrl, pageobj, callback);   
    },

    // 获取分组
    getGroup: function (pageobj, callback){
        this.requestUrl({},urlData.getGroupUrl, pageobj, callback);   
    },

}   





