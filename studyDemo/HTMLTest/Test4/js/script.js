let citycode = 0
let cityname = ''
let cityweatherinfo = {}
let sevendayweatherinfo = {}
let perhourweatherinfo = {}

const daysOfWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]

const weathericon = $(".weathericon").eq(0)
const currentweathernum = $(".currentweathernum").eq(0)
const currentweathertext = $(".currentweathertext").eq(0)
const windScaleinfo = $(".windScaleinfo").eq(0)
const windDirinfo = $(".windDirinfo").eq(0)
const humidityinfo = $(".humidityinfo").eq(0)
const feelsLikeinfo = $(".feelsLikeinfo").eq(0)
const visinfo = $(".visinfo").eq(0)
const precipinfo = $(".precipinfo").eq(0)
const pressureinfo = $(".pressureinfo").eq(0)
const placeandtimetime = $(".placeandtimetime").eq(0)
const placetext = $(".placetext").eq(0)
const dayweatherdayxinqi = $(".dayweatherdayxinqi")
const dayweatherdayriqi = $(".dayweatherdayriqi")
const dayweatherlogo = $(".dayweatherlogo")
const maxweathernum = $(".maxweathernum")
const minweathernum = $(".minweathernum")
const perhourweathertemp = $(".perhourweathertemp")
const perhourweathertempheight = $(".perhourweathertempheight")
const perhourweathericon = $(".perhourweathericon")
const perhourweatherdir = $(".perhourweatherdir")
const perhourweathertime = $(".perhourweathertime")

$(".gologobox").eq(0).click(function () {
    let searchkey = $('#searchcity').val()
    if (searchkey.trim() === '') {
        alert('输入不能为空！')
    } else {
        $('#searchcity').val('')
        $.ajax({
            url: `https://geoapi.qweather.com/v2/city/lookup?location=${searchkey}&key=c009167ad03e4cd781a7a3e5dd8e3357`,
            method: 'GET',
            success: function (data) {
                if (data.code == 200) {
                    if (data.location.length > 0) {
                        cityname = data.location[0].name
                        citycode = data.location[0].id
                        $.ajax({
                            url: `https://devapi.qweather.com/v7/weather/now?location=${citycode}&key=c009167ad03e4cd781a7a3e5dd8e3357`,
                            method: 'GET',
                            success: function (data) {
                                console.log(data)
                                if (data.code == 200) {
                                    cityweatherinfo = data.now
                                    updateWeatherInfoBox()
                                }
                            },
                            error: function () {
                                alert('请求失败')
                            }
                        })

                        $.ajax({
                            url: `https://devapi.qweather.com/v7/weather/7d?location=${citycode}&key=c009167ad03e4cd781a7a3e5dd8e3357`,
                            method: 'GET',
                            success: function (data) {
                                console.log(data)
                                if (data.code == 200) {
                                    sevendayweatherinfo = data.daily
                                    updateSevenDayWeather()
                                }
                            },
                            error: function () {
                                alert('请求失败')
                            }
                        })

                        $.ajax({
                            url: `https://devapi.qweather.com/v7/weather/24h?location=${citycode}&key=c009167ad03e4cd781a7a3e5dd8e3357`,
                            method: 'GET',
                            success: function (data) {
                                console.log(data)
                                if (data.code == 200) {
                                    perhourweatherinfo = data.hourly
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
                    
                }
            },
            error: function () {
                alert('请求失败')
            }
        })
    }
})

$('#searchcity').val('南昌')
$(".gologobox").eq(0).click()

function updateWeatherInfoBox() {
    let date = new Date(cityweatherinfo.obsTime)
    let formattedDate = date.toLocaleString()
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
}

function updateSevenDayWeather() {
    let currentDate = new Date()
    let dayOfWeek = currentDate.getDay()
    let dayName = '今天'

    for (let i = 0; i < 7; i++) {
        if (i != 0) {
            dayName = daysOfWeek[(dayOfWeek + i) % 7]
        }
        let day = sevendayweatherinfo[i].fxDate
        const date = new Date(day)
        const formattedDate = new Intl.DateTimeFormat('zh-CN', {
            month: 'long',
            day: 'numeric'
        }).format(date)
        dayweatherdayxinqi.eq(i).text(`${dayName}`)
        dayweatherdayriqi.eq(i).text(`${formattedDate}`)
        dayweatherlogo.eq(i).attr('src', `./static/icons/${sevendayweatherinfo[i].iconDay}.svg`)
        maxweathernum.eq(i).text(`${sevendayweatherinfo[i].tempMax}°`)
        minweathernum.eq(i).text(`${sevendayweatherinfo[i].tempMin}°`)
    }
}

function updatePerHourWeather() {
    let mintemp = 99
    let maxtemp = -99
    for (let i = 0; i < 24; i = i + 2) {
        if (perhourweatherinfo[i].temp > maxtemp) {
            maxtemp = perhourweatherinfo[i].temp
        }
        if (perhourweatherinfo[i].temp < mintemp) {
            mintemp = perhourweatherinfo[i].temp
        }
    }

    let tempheight = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]

    for (let i = 0; i < 12; i++) {
        tempheight[i] = 20 + 60 * (perhourweatherinfo[2 * i].temp - mintemp) / (maxtemp - mintemp)
        tempheight[i] = Math.floor(tempheight[i])
    }
    // console.log(tempheight)
    
    for (let i = 0; i < 12; i++) {
        perhourweathertemp.eq(i).text(`${perhourweatherinfo[2 * i].temp}°`)
        perhourweathertempheight.eq(i).css('height', `${tempheight[i]}px`)
        perhourweathericon.eq(i).attr('src', `./static/icons/${perhourweatherinfo[2 * i].icon}.svg`)
        perhourweatherdir.eq(i).css('rotate', `${perhourweatherinfo[2 * i].wind360}deg`)
        perhourweathertime.eq(i).text(`${perhourweatherinfo[2 * i].fxTime.substring(11, 16)}`)
    }
}