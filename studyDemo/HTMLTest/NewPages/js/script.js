let currentroute = '/'
let isinputfocus = false
let searchKey = ''
let showClear = false

// 获取 DOM 元素
const homelink = document.getElementById("homelink")
const projectslink = document.getElementById("projectslink")
const aboutlink = document.getElementById("aboutlink")
const searchInput = document.querySelector('.searchinput')
const clearSpan = document.querySelector('.clearbox .clear')

// 事件处理函数
function inputFocus() {
    isinputfocus = true
    searchInput.parentElement.classList.add('focused')
}

function inputBlur() {
    isinputfocus = false;
    searchInput.parentElement.classList.remove('focused')
}

function inputInput() {
    searchKey = searchInput.value;
    showClear = searchKey !== '';
    clearSpan.style.display = showClear ? 'flex' : 'none'
}

function clearInput() {
    searchKey = ''
    showClear = false
    searchInput.value = ''
    clearSpan.style.display = 'none'
}

// 添加事件监听器
searchInput.addEventListener('focus', inputFocus)
searchInput.addEventListener('blur', inputBlur)
searchInput.addEventListener('input', inputInput)
clearSpan.addEventListener('click', clearInput)

// 模拟路由变化
window.addEventListener('hashchange', function () {
    currentroute = window.location.hash.slice(1) || '/'
    updateActiveLink()
})

function updateActiveLink() {
    if (currentroute === '/') {
        homelink.classList.add('activelink')
        projectslink.classList.remove('activelink')
        aboutlink.classList.remove('activelink')
    } else if (currentroute === '/projects') {
        homelink.classList.remove('activelink')
        projectslink.classList.add('activelink')
        aboutlink.classList.remove('activelink')
    } else if (currentroute === '/about') {
        homelink.classList.remove('activelink')
        projectslink.classList.remove('activelink')
        aboutlink.classList.add('activelink')
    }
}

// 初始化
updateActiveLink()

const msg = document.getElementsByClassName("msg")[0]
const from = document.getElementsByClassName("from")[0]
// 获取每日一言
function getHitokoto() {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://v1.hitokoto.cn/', false)
    xhr.send()
    const resData = JSON.parse(xhr.responseText)
    let datamsg = resData.hitokoto
    let datafrom = '—— 「 ' + resData.from + ' 」'
    // 修改每日一言内容
    msg.textContent = datamsg
    from.textContent = datafrom
}
getHitokoto()

const loginbtn = document.getElementById('loginbtn')
loginbtn.addEventListener('click', function () {
    getHitokoto()
})