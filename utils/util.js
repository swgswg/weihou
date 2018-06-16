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


module.exports = {
    formatTime: formatTime,
    formatDate: formatDate,
    rand: rand,
}