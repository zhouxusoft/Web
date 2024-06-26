// 城市天气代码
let citycode = 0
// 城市名称
let cityname = ''
// 城市实时天气信息
let cityweatherinfo = {}
// 城市一周天气信息
let sevendayweatherinfo = {}
// 城市24小时天气信息
let perhourweatherinfo = {}

// 定义周，用于前端显示
const daysOfWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]

// 实时天气的大天气图标
const weathericon = $(".weathericon").eq(0)
// 实时天气的温度数值
const currentweathernum = $(".currentweathernum").eq(0)
// 实时天气的天气描述文本
const currentweathertext = $(".currentweathertext").eq(0)
// 实时天气的风力等级
const windScaleinfo = $(".windScaleinfo").eq(0)
// 实时天气的风向
const windDirinfo = $(".windDirinfo").eq(0)
// 实时天气的相对湿度
const humidityinfo = $(".humidityinfo").eq(0)
// 实时天气的体感温度
const feelsLikeinfo = $(".feelsLikeinfo").eq(0)
// 实时天气的可视距离
const visinfo = $(".visinfo").eq(0)
// 实时天气的降水量
const precipinfo = $(".precipinfo").eq(0)
// 实时天气的大气压强
const pressureinfo = $(".pressureinfo").eq(0)
// 实时天气的观测时间
const placeandtimetime = $(".placeandtimetime").eq(0)
// 实时天气的城市名称
const placetext = $(".placetext").eq(0)
// 7天天气的每天周几
const dayweatherdayxinqi = $(".dayweatherdayxinqi")
// 7天天气的每天日期
const dayweatherdayriqi = $(".dayweatherdayriqi")
// 7天天气的每天天气图标
const dayweatherlogo = $(".dayweatherlogo")
// 7天天气的每天最大温度
const maxweathernum = $(".maxweathernum")
// 7天天气的每天最低温度
const minweathernum = $(".minweathernum")
// 24小时温度的每小时温度
const perhourweathertemp = $(".perhourweathertemp")
// 24小时温度的每小时温度高度条
const perhourweathertempheight = $(".perhourweathertempheight")
// 24小时温度的每小时温度图标
const perhourweathericon = $(".perhourweathericon")
// 24小时温度的每小时风向
const perhourweatherdir = $(".perhourweatherdir")
// 24小时温度的每小时时间
const perhourweathertime = $(".perhourweathertime")

// 点击查询按钮
$(".gologobox").eq(0).click(function () {
    //获取用户的输入值
    let searchkey = $('#searchcity').val()
    // 判断输入是否为空，若为空则不进行天气查询
    if (searchkey.trim() === '') {
        alert('输入不能为空！')
    } else {
        // 更新hitokoto
        updateHitokoto()
        // 进行查询时清空查询框内容
        $('#searchcity').val('')
        // 发送查询请求，先获取用户查询城市的天气代码
        $.ajax({
            url: `https://geoapi.qweather.com/v2/city/lookup?location=${searchkey}&key=c009167ad03e4cd781a7a3e5dd8e3357`,
            method: 'GET',
            success: function (data) {
                if (data.code == 200) {
                    // 查询成功，判断查询结果集长度是否大于1,若不大于则说明没找到用户输入的匹配城市
                    if (data.location.length > 0) {
                        // 获取城市代码和城市名称
                        cityname = data.location[0].name
                        citycode = data.location[0].id
                        // 通过城市代码进行该城市实时天气的查询
                        $.ajax({
                            url: `https://devapi.qweather.com/v7/weather/now?location=${citycode}&key=c009167ad03e4cd781a7a3e5dd8e3357`,
                            method: 'GET',
                            success: function (data) {
                                // console.log(data)
                                // 判断查询是否成功
                                if (data.code == 200) {
                                    // 获取城市实时天气信息
                                    cityweatherinfo = data.now
                                    // 更新页面城市实时天气显示
                                    updateWeatherInfoBox()
                                } else {
                                    alert('查询失败，接口错误')
                                }
                            },
                            error: function () {
                                alert('请求失败')
                            }
                        })

                        // 通过城市代码进行该城市近七天天气的查询
                        $.ajax({
                            url: `https://devapi.qweather.com/v7/weather/7d?location=${citycode}&key=c009167ad03e4cd781a7a3e5dd8e3357`,
                            method: 'GET',
                            success: function (data) {
                                // console.log(data)
                                // 判断查询是否成功
                                if (data.code == 200) {
                                    // 获取城市近七天天气信息
                                    sevendayweatherinfo = data.daily
                                    // 更新页面近七天天气信息
                                    updateSevenDayWeather()
                                }
                            },
                            error: function () {
                                alert('请求失败')
                            }
                        })

                        // 通过城市代码进行该城市24小时天气的查询
                        $.ajax({
                            url: `https://devapi.qweather.com/v7/weather/24h?location=${citycode}&key=c009167ad03e4cd781a7a3e5dd8e3357`,
                            method: 'GET',
                            success: function (data) {
                                // console.log(data)
                                // 判断是否查询成功
                                if (data.code == 200) {
                                    // 获取城市24小时天气信息
                                    perhourweatherinfo = data.hourly
                                    // 更新页面24小时天气信息显示
                                    updatePerHourWeather()
                                }
                            },
                            error: function () {
                                alert('请求失败')
                            }
                        })
                    } else {
                        alert('未查询到城市')
                    }
                } else {
                    alert('查询地区失败')
                }
            },
            error: function () {
                alert('请求失败')
            }
        })
    }
})

// 进入页面时，默认显示南昌的天气信息
$('#searchcity').val('南昌')
$(".gologobox").eq(0).click()

/**
 * 更新页面实时天气信息
 */
function updateWeatherInfoBox() {
    // 转换天气格式为 YYYY/MM/DD HH:MM:SS
    let date = new Date(cityweatherinfo.obsTime)
    let formattedDate = date.toLocaleString()
    // 改变页面信息
    weathericon.attr('src', `./static/icons/${cityweatherinfo.icon}.svg`)
    currentweathernum.text(`${cityweatherinfo.temp}°`)
    currentweathertext.text(`${cityweatherinfo.text}`)
    windScaleinfo.text(`${cityweatherinfo.windScale}级`)
    windDirinfo.text(`${cityweatherinfo.windDir}`)
    humidityinfo.text(`${cityweatherinfo.humidity}%`)
    feelsLikeinfo.text(`${cityweatherinfo.feelsLike}°`)
    visinfo.text(`${cityweatherinfo.vis}km`)
    precipinfo.text(`${cityweatherinfo.precip}mm`)
    pressureinfo.text(`${cityweatherinfo.pressure}hPa`)
    placeandtimetime.text(`${formattedDate}`)
    placetext.text(`${cityname}`)
    $('.currentweatherbox').css('display', 'flex')
    $('.currentweatherlist').css('display', 'flex')
    // 显示改变后的信息
    showDisplay(0)
    showDisplay(1)
    showDisplay(2)
}

/**
 * 更新页面7天天气信息显示
 */
function updateSevenDayWeather() {
    let currentDate = new Date()
    // 获取当前天是星期几
    let dayOfWeek = currentDate.getDay()
    // 默认当前天为今天
    let dayName = '今天'

    // 循环修改7天信息的每一天信息
    for (let i = 0; i < 7; i++) {
        // 获取每一天是星期几，第一天默认显示今天
        if (i != 0) {
            dayName = daysOfWeek[(dayOfWeek + i) % 7]
        }
        // 获取当前天的日期
        let day = sevendayweatherinfo[i].fxDate
        const date = new Date(day)
        // 格式化日期时间显示为 xx月xx日
        const formattedDate = new Intl.DateTimeFormat('zh-CN', {
            month: 'long',
            day: 'numeric'
        }).format(date)
        // 更新页面显示
        dayweatherdayxinqi.eq(i).text(`${dayName}`)
        dayweatherdayriqi.eq(i).text(`${formattedDate}`)
        dayweatherlogo.eq(i).attr('src', `./static/icons/${sevendayweatherinfo[i].iconDay}.svg`)
        maxweathernum.eq(i).text(`${sevendayweatherinfo[i].tempMax}°`)
        minweathernum.eq(i).text(`${sevendayweatherinfo[i].tempMin}°`)
    }
    // 显示改变后的信息
    showDisplay(3)
}

/**
 * 更新页面中24小时天气的显示
 */
function updatePerHourWeather() {
    // 定义一天中的最高温和最低温
    let mintemp = 99
    let maxtemp = -99
    // 获取一天中的最高温和最低温，用于温度条高度显示的计算
    for (let i = 0; i < 24; i = i + 2) {
        if (perhourweatherinfo[i].temp > maxtemp) {
            maxtemp = perhourweatherinfo[i].temp
        }
        if (perhourweatherinfo[i].temp < mintemp) {
            mintemp = perhourweatherinfo[i].temp
        }
    }

    // 默认温度条高度显示为20px
    let tempheight = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]

    // 计算每小时的温度条高度，规则：最低20px,最高80px,当前时的高度等于（当前时的温度和最低温度的温差）除以（当天的最大温差）乘以 60 + 20
    for (let i = 0; i < 12; i++) {
        tempheight[i] = 20 + 60 * (perhourweatherinfo[2 * i].temp - mintemp) / (maxtemp - mintemp)
        tempheight[i] = Math.floor(tempheight[i])
    }
    // console.log(tempheight)

    // 循环更新每小时的温度信息
    for (let i = 0; i < 12; i++) {
        perhourweathertemp.eq(i).text(`${perhourweatherinfo[2 * i].temp}°`)
        perhourweathertempheight.eq(i).css('height', `${tempheight[i]}px`)
        perhourweathericon.eq(i).attr('src', `./static/icons/${perhourweatherinfo[2 * i].icon}.svg`)
        perhourweatherdir.eq(i).css('rotate', `${perhourweatherinfo[2 * i].wind360}deg`)
        perhourweathertime.eq(i).text(`${perhourweatherinfo[2 * i].fxTime.substring(11, 16)}`)
    }

    // 显示更新后的信息
    showDisplay(4)
}

const hitokotomsg = $('.hitokotomsg').eq(0)
const hitokotofrom = $('.hitokotofrom').eq(0)

function updateHitokoto() {
    $.ajax({
        url: 'https://v1.hitokoto.cn/',
        type: 'POST',
        success: function (resData) {
            let datamsg = resData.hitokoto
            let datafrom = '—— 「 ' + resData.from + ' 」'
            console.log(datamsg)
            console.log(datafrom)

            hitokotomsg.text(datamsg)
            hitokotofrom.text(datafrom)
        },
        error: function (xhr, status, error) {
            console.error("请求失败")
        }
    })
}




// 修改每一区块的可见性
function showDisplay(num) {
    $(".displaynone").eq(num).css('opacity', 1)
}