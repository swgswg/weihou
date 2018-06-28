function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * 格式化时间戳 
 */
function formatDate(time, format = 'YY-MM-DD hh:mm:ss') {
    var date = new Date(time);

    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
        return '0' + index;
    });////开个长度为10的数组 格式为 00 01 02 03

    var newTime = format.replace(/YY/g, year)
        .replace(/MM/g, preArr[month] || month)
        .replace(/DD/g, preArr[day] || day)
        .replace(/hh/g, preArr[hour] || hour)
        .replace(/mm/g, preArr[min] || min)
        .replace(/ss/g, preArr[sec] || sec);

    return newTime;
    // console.log(formatDate(new Date().getTime()));//2017-05-12 10:05:44
    // console.log(formatDate(1527253460000, 'YY年MM月DD日'));//2017年05月12日
    // console.log(formatDate(1527253460000, '今天是YY/MM/DD hh:mm:ss'));//今天是2017/05/12 10:07:45
}


/**
 * m-n之间的随机数
 */
function rand(m, n) {
    return Math.ceil(Math.random() * (n - m + 1)) + (m - 1);
}

/**
 * 范围数组
 */
function myrange(start, end) {
    let arr = [];
    let len = end - start + 1;
    for (let i = 1; i <= len; i++) {
        arr.push(i);
    }
    return arr;
}

/**
 * 指定元素,指定个数 数组
 */
function repeatArr(myvalue, mylength) {
    let arr = [];
    for (let i = 0; i < mylength; i++) {
        arr[i] = myvalue;
    }
    return arr;
}

/**
 * 验证正则
 */
function checkReg(flag, data) {
    let reg = null;
    switch (flag) {
        case 1:
            // 手机号
            reg = /^1[34578]\d{9}$/;
            break;
        case 2:
            // 身份证号
            reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            break;
        case 3:
            // 银行卡号
            reg = /^([1-9]{1})(\d{15}|\d{18})$/;
        case 4:
            // 带小数的金额
            reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
            break;
    }
    return reg.test(data);
}


/**
 * 处理银行卡号显示*
 */
function bankCardByStar(data) {
    let newdata = String(data);
    let len = newdata.length;
    return ('*'.repeat(len - 4) + newdata.slice(len - 4));
}

/**
 * 获取当前页url
 * @returns {*}
 */
function getCurrentPageUrl() {
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    var url = currentPage.route //当前页面url
    return url
}

/**
 * 获取当前页带参数的url
 * @returns {string}
 */
function getCurrentPageUrlWithArgs() {
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    var url = currentPage.route //当前页面url
    var options = currentPage.options //如果要获取url中所带的参数可以查看options

    //拼接url的参数
    var urlWithArgs = url + '?'
    for (var key in options) {
        var value = options[key]
        urlWithArgs += key + '=' + value + '&'
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

    return urlWithArgs
}


/**
 * 获取上一页url
 * @returns {*}
 */
function getPrevPageUrl() {
    let pages = getCurrentPages(); //获取加载的页面
    let prevPage = pages[pages.length - 2]; //获取上一级页面的对象
    let url = prevPage.route; //上一个页面url
    return url;
}

/**
 * 冒泡排序
 */
function mySort(arr,flag) {
    if (arr.length == 1) {
        return arr;
    }
    let len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            // 1从小到大排序
            if (flag == 1){
                if (arr[i] > arr[j]) {
                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            } else {
                // 从大到小排序
                if (arr[i] < arr[j]) {
                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
    }
    return arr;
}

/**
 * 倒计时
 * @param endTime
 */
function mytimer(endTime,that){
    var EndTime = new Date(endTime);
    var clear_set = null;
    console.log(EndTime);
    clear_set = setInterval(function(){
        let NowTime = new Date();
        let t =EndTime.getTime() - NowTime.getTime();
        let d=0;
        let h=0;
        let m=0;
        let s=0;
        if(t>=0){
            d=Math.floor(t/1000/60/60/24);
            if(d < 10){
                d = '0' + d;
            }
            h=Math.floor(t/1000/60/60%24);
            if(h < 10){
                h = '0' + h;
            }
            m=Math.floor(t/1000/60%60);
            if(m < 10){
                m = '0' + m;
            }
            s=Math.floor(t/1000%60);
            if(s < 10){
                s = '0' + s;
            }
            that.setData({
                timer:d+'天'+h+'时'+m+'分'+s+'秒'
            });
        }else{
            that.setData({
                timer: '已结束'
            });
            clearInterval(clear_set);
        }
    },1000);
}

/**
 *  微信 wx.showToast提示框二次封装
 * @param title
 * @param type
 */
function showToast(title, mytype) {
    let image = '';
    switch (mytype) {
        case 'error':
            image = '/images/icon_error.png'
            break;
        case 'success':
            image = '/images/icon_success.png'
            break;
        case 'warning':
            image = '/images/icon_warning.png'
            break;
    }
    wx.showToast({
        title: title,
        image: image,
        duration: 0,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
    })
}

module.exports = {
    formatTime: formatTime,
    formatDate: formatDate,
    rand: rand,
    myrange: myrange,
    repeatArr: repeatArr,
    checkReg: checkReg,
    bankCardByStar: bankCardByStar,
    getCurrentPageUrl: getCurrentPageUrl,
    getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs,
    getPrevPageUrl: getPrevPageUrl,
    mySort: mySort,
    mytimer:mytimer,
    showToast:showToast,

}