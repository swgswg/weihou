const baseUrl = "http://39.107.70.80:8080/";
// const baseUrl = "http://192.168.3.136:8080/";
module.exports = {
    uploadFileUrl: 'http://jiaoyuvideo.oss-cn-beijing.aliyuncs.com/',
    baseUrl: baseUrl,
    duoguan_user_token: "gh_e8a34929ec8f",
    duoguan_share_info: '',
    duoguan_config_version: 3975,
    // 查询商品列表
    getGoodsUrl: baseUrl + 'MicroPlatform/goods/getGoods',
    // 添加商品
    insertGoodsUrl: baseUrl + 'MicroPlatform/goods/insertGoods',
    // 修改商品
    // 删除商品
    // 查询商品详情
    getGoodsDetailsUrl: baseUrl + 'MicroPlatform/goods/getGoodsDetails',
    // 上架/下架商品
    deleteGoodsUrl: baseUrl +'MicroPlatform/goods/deleteGoods',
    // 查询分组(给店铺用)
    getGroupUrl: baseUrl + 'MicroPlatform/group/getGroup',
    // 查询分类(给商品用)
    getClassUrl: baseUrl +'MicroPlatform/group/getClass', 
    // 商品评价
    getCommentUrl: baseUrl +'MicroPlatform/comment/getComment',
    // 查询订单
    getOrderUrl: baseUrl + 'MicroPlatform/order/getOrder',
    // 改变订单状态
    updateOrderStatusUrl: baseUrl + 'MicroPlatform/order/updateOrderStatus',
    // 查询订单详情
    getOrderDetailUrl: baseUrl +'MicroPlatform/order/getOrderDetail',
    // 查询退换货
    getGoodBackUrl: baseUrl +'MicroPlatform/goodsBack/getGoodBack',
}