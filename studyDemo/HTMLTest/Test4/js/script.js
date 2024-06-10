let citycode = 0
let cityweatherinfo = {}

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

$(".gologobox").eq(0).click(function () {
    let searchkey = $('#searchcity').val()
    if (searchkey.trim() === '') {
        alert('输入不能为空！')
    } else {
        $.ajax({
            url: `https://geoapi.qweather.com/v2/city/lookup?location=${searchkey}&key=c009167ad03e4cd781a7a3e5dd8e3357`,
            method: 'GET',
            success: function (data) {
                console.log(data.location[0].id)
                if (data.code == 200) {
                    if (data.location.length > 0) {
                        citycode = data.location[0].id
                        $.ajax({
                            url: `https://devapi.qweather.com/v7/weather/now?location=${citycode}&key=13ea0f93c16c401db51b5130dccee250`,
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

function updateWeatherInfoBox() {
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
    $('.currentweatherbox').css('display', 'flex')
    $('.currentweatherlist').css('display', 'flex')
}