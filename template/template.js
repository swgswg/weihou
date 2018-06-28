//初始化数据
function tabbarinit(flag) {
    // vipLevel 1用户  2经销商
    if (flag == 1) {
        return [
            {
                "pagePath": "/pages/shop/mall/mall",
                "text": "商城",
                "iconPath": "images/tabbar/shop.png",
                "selectedIconPath": "images/tabbar/shop_in.png"
            },
            {
                "pagePath": "/pages/shop/seller/seller",
                "text": "分类",
                "iconPath": "images/tabbar/shop_cate.png",
                "selectedIconPath": "images/tabbar/shop_cate_in.png"
            },
            {
                "pagePath": "/pages/shop/bcart/index",
                "text": "购物车",
                "iconPath": "images/tabbar/shop_cart.png",
                "selectedIconPath": "images/tabbar/shop_cart_in.png"
            },
            {
                "pagePath": "/pages/user/index/index",
                "text": "我的",
                "iconPath": "images/tabbar/user.png",
                "selectedIconPath": "images/tabbar/user_in.png"
            },
            {
                "pagePath": "/pages/user/openShop/openShop",
                "text": "申请开店",
                "iconPath": "images/tabbar/set-up-shop.png",
                "selectedIconPath": "images/tabbar/set-up-shop.png"
            }
        ]
    } else if (flag == 2) {
        return [
            {
                "pagePath": "/pages/myGoods/goodsList/goodsList",
                "text": "我的商品",
                "iconPath": "images/tabbar/sellgoods.png",
                "selectedIconPath": "images/tabbar/sellgoods_r.png"
            },
            {
                "pagePath": "/pages/orderManage/orderManage",
                "text": "订单管理",
                "iconPath": "images/tabbar/order.png",
                "selectedIconPath": "images/tabbar/order_r.png"
            },
            {
                "pagePath": "/pages/moneyManage/moneyManage",
                "text": "财务管理",
                "iconPath": "images/tabbar/money.png",
                "selectedIconPath": "images/tabbar/money_r.png"
            },
            {
                "pagePath": "/pages/myself/myself",
                "text": "我的商户",
                "iconPath": "images/tabbar/people.png",
                "selectedIconPath": "images/tabbar/people_r.png"
            }
        ]
    }

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target, flag) {
    var that = target;
    var bindData = {};
    var otabbar = tabbarinit(flag);
    otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']; //换当前的icon
    otabbar[id]['current'] = 1;
    bindData[bindName] = otabbar;
    that.setData({ bindData });
}

module.exports = {
    tabbar: tabbarmain
}