const bottombox = document.getElementsByClassName('bottombox')[0]

document.addEventListener('scroll', function () {
    let rect = bottombox.getBoundingClientRect()
    let windowHeight = window.innerHeight || document.documentElement.clientHeight

    if (rect.top < windowHeight * 0.5 && rect.bottom > windowHeight * 0.3) {
        bottombox.classList.add('bottomboxhover')
    } else {
        bottombox.classList.remove('bottomboxhover')
    }
})

var gradientBackground = document.getElementById('gradient-background');

gradientBackground.addEventListener('mousemove', function (e) {
    var x = e.clientX; // 获取鼠标位置的X坐标
    var y = e.clientY; // 获取鼠标位置的Y坐标

    var rect = gradientBackground.getBoundingClientRect();

    var localX = x - rect.left;
    var localY = y - rect.top;

    var width = gradientBackground.offsetWidth; // 获取元素宽度
    var height = gradientBackground.offsetHeight; // 获取元素高度

    // 计算鼠标位置占元素的百分比
    var xPercent = localX / width * 100;
    var yPercent = localY / height * 100;

    // 更新渐变背景的中心点
    gradientBackground.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, #dfedf4 0, #628699 20%, #628699 100%)`;
    gradientBackground.style.webkitBackgroundClip = 'text'; // 对于支持的 WebKit 浏览器
    gradientBackground.style.backgroundClip = 'text';
});