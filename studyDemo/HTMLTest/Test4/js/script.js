let citycode = 0

$.ajax ({
    url: 'https://geoapi.qweather.com/v2/city/lookup?location=北京&key=c009167ad03e4cd781a7a3e5dd8e3357',
    method: 'GET',
    success: function (data) {
        let a = data
        console.log(data.location[0].id)
        if (data.code == 200) {
            citycode = data.location[0].id
            $.ajax ({
                url: 'https://devapi.qweather.com/v7/weather/now?location=101010100&key=13ea0f93c16c401db51b5130dccee250',
                method: 'GET',
                success: function (data) {
                    console.log(data)
                    if (data.code == 200) {
                        console.log(data.now)
                    }
                }
            })
        }
    }
})
