/**
 * pagehello javascript
 */
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

const pagehello = document.getElementById('pagehello')
const pageworld = document.getElementById('pageworld')

const rotatetextbox = document.getElementsByClassName('rotatetextbox')[0]
const rotatetextboxspans = rotatetextbox.getElementsByTagName('span')

function updateActiveLink() {
    if (currentroute === '/') {
        homelink.classList.add('activelink')
        projectslink.classList.remove('activelink')
        pagehello.style.display = 'flex'
        pageworld.style.display = 'none'
        rotatetextbox.classList.remove('runtextfadein')
    } else if (currentroute === '/projects') {
        homelink.classList.remove('activelink')
        projectslink.classList.add('activelink')
        pagehello.style.display = 'none'
        pageworld.style.display = 'block'
        setTimeout(() => {
            rotatetextbox.classList.add('runtextfadein')
        }, 100)
    }
}

// 初始化
currentroute = window.location.hash.slice(1) || '/'
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

/**
 * page1 javascript
 */
const bottombox = document.getElementsByClassName('bottombox')[0]

window.onload = () => {
    let rectbottombox = bottombox.getBoundingClientRect()
    let windowHeight = window.innerHeight || document.documentElement.clientHeight

    if (rectbottombox.top < windowHeight * 0.5 && rectbottombox.bottom > windowHeight * 0.3) {
        bottombox.classList.add('bottomboxhover')
    } else {
        bottombox.classList.remove('bottomboxhover')
    }
}

/**
 * page2 javascript
 */
document.addEventListener('scroll', function () {
    let rectbottombox = bottombox.getBoundingClientRect()
    let windowHeight = window.innerHeight || document.documentElement.clientHeight

    if (rectbottombox.top < windowHeight * 0.5 && rectbottombox.bottom > windowHeight * 0.3) {
        bottombox.classList.add('bottomboxhover')
    } else {
        bottombox.classList.remove('bottomboxhover')
    }
})

const gradientBackground = document.getElementById('gradient-background')

gradientBackground.addEventListener('mousemove', function (e) {
    let x = e.clientX // 获取鼠标位置的X坐标
    let y = e.clientY // 获取鼠标位置的Y坐标

    let rect = gradientBackground.getBoundingClientRect()

    let localX = x - rect.left
    let localY = y - rect.top

    let width = gradientBackground.offsetWidth // 获取元素宽度
    let height = gradientBackground.offsetHeight // 获取元素高度

    // 计算鼠标位置占元素的百分比
    let xPercent = localX / width * 100
    let yPercent = localY / height * 100

    // 更新渐变背景的中心点
    gradientBackground.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, #dfedf4 0, #628699 20%, #628699 100%)`
    gradientBackground.style.backgroundClip = 'text'
})

for (let i = 0; i < rotatetextboxspans.length; i++) {
    const element = rotatetextboxspans[i]
    let translateYNum = 100 + 25 * i
    let transformTime = 1.2 + 0.07 * i
    element.style.transform = `translateY(${translateYNum}%) rotate(16deg) translateZ(0)`
    element.style.transition = `transform ${transformTime}s ease`
    // element.style.willChange = "transform"
}

/**
 * page3 javascript
 */
const displaybtn = document.getElementsByClassName('displaybtn')[0]
const borderboxcover = document.getElementsByClassName('borderboxcover')[0]
const textbox = document.getElementsByClassName('textbox')[0]

let p1 = `
    <div>
        <h4 class="texttitle">什么是计算机软件？</h4>
        <p>计算机软件是指计算机程序及其有关文档。计算机程序是指为了得到某种结果而可以由计算机等具有信息处理能力的装置执行的代码化指令序列，或者可以被自动转换成代码化指令序列的符号化指令序列或者符号化语句序列。同一计算机程序的源程序和目标程序为同一作品。文档是指用来描述程序的内容、组成、设计、功能规格、开发情况、测试结果及使用方法的文字资料和图表等，如程序设计说明书、流程图、用户手册等。</p>
    </div>
`

let p2 = `
    <div>
        <h4 class="texttitle">软件著作权保护期限是多长？</h4>
        <p>自然人的软件著作权，保护期为自然人终生及其死亡后50年，截止于自然人死亡后第50年的12月31日；软件是合作开发的，截止于最后死亡的自然人死亡后第50年的12月31日。法人或者非法人组织的软件著作权，保护期为50年，截止于软件首次发表后第50年的12月31日，但软件自开发完成之日起50年内未发表的，不再保护。</p>
    </div>
`

let p3 = `
    <div>
        <h4 class="texttitle">哪些人可以成为软件著作权人？</h4>
        <p>独立开发完成软件的自然人、法人或非法人组织以及通过合同约定、继承、受让或者承受软件著作权的自然人、法人或者非法人组织都可以成为著作权人。</p>
    </div>
`

displaybtn.addEventListener('click', function () {
    borderboxcover.classList.add('pagefadeinout')
    let tempp = p1
    p1 = p2
    p2 = p3
    p3 = tempp
    setTimeout(() => {
        textbox.innerHTML = p1 + p2 + p3
    }, 500)

})

borderboxcover.addEventListener('animationend', function () {
    borderboxcover.classList.remove('pagefadeinout')
})