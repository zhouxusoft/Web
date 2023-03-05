let passwords = document.querySelectorAll('.passwordBox')
let logoButtons = document.querySelectorAll('.logoButton')
for (let i = 0; i < logoButtons.length; i++) {
    logoButtons[i].onclick = function () {
        if (passwords[i].type === 'password') {
            passwords[i].setAttribute('type', 'text')
            logoButtons[i].classList.add('hide')
        }
        else {
            passwords[i].setAttribute('type', 'password')
            logoButtons[i].classList.remove('hide')
        }
    }
}

let lowerCase = document.getElementById('lower')
let upperCase = document.getElementById('upper')
let numCase = document.getElementById('num')
let specialCase = document.getElementById('special')
let lengthCase = document.getElementById('length')
let recheckCase = document.getElementById('recheck')
let pwd;

function checkPassword(data) {
    pwd = data;

    const lower = new RegExp('(?=.*[a-z])')
    const upper = new RegExp('(?=.*[A-Z])')
    const num = new RegExp('(?=.*[0-9])')
    const special = new RegExp('(?=.*[!@#\$%\^&\*])')
    const length = new RegExp('(?=.{8,})')

    if(lower.test(data)) {
        lowerCase.classList.add('valid')
    }
    else {
        lowerCase.classList.remove('valid')
    }

    if(upper.test(data)) {
        upperCase.classList.add('valid')
    }
    else {
        upperCase.classList.remove('valid')
    }

    if(num.test(data)) {
        numCase.classList.add('valid')
    }
    else {
        numCase.classList.remove('valid')
    }

    if(special.test(data)) {
        specialCase.classList.add('valid')
    }
    else {
        specialCase.classList.remove('valid')
    }

    if(length.test(data)) {
        lengthCase.classList.add('valid')
    }
    else {
        lengthCase.classList.remove('valid')
    }
} 
function recheckPassword(data) {
    if (data === '') {
        recheckCase.classList.remove('valid')
    }
    else if(data === pwd) {
        recheckCase.classList.add('valid')
    }
    else {
        recheckCase.classList.remove('valid')
    }
}
