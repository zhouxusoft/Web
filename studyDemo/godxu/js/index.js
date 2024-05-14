const addbookname = document.getElementsByClassName("addbookname")[0]
const addbookauthor = document.getElementsByClassName("addbookauthor")[0]
const addbookpublisher = document.getElementsByClassName("addbookpublisher")[0]

const addbook = document.getElementsByClassName("addbook")[0]
const addbookcancle = document.getElementsByClassName("addbookcancle")[0]

/**
 * 点击添加图书
 */
addbook.addEventListener("click", () => {
    let bookinfo = {
        bookname: addbookname.value,
        author: addbookauthor.value,
        publisher: addbookpublisher.value,
        creator: "godxu"
    }
    if (bookinfo.bookname == "" || bookinfo.author == "" || bookinfo.publisher == "") {
        alert("数据不合法")
    } else {
        fetch("https://hmajax.itheima.net/api/books", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookinfo)
        }).then(response => response.json()).then(data => {
            // console.log(data)
            if (data.message == "添加图书成功") {
                alert("添加图书成功")
            } else {
                alert("出错了")
            }
            getBookList()
        }).catch(error => {
            console.log('Error:', error)
        })
        addbookcancle.click()
    }
    // console.log(bookinfo)
})

const booklist = document.getElementsByClassName("booklist")[0]
const editbookmodalbtn = document.getElementsByClassName("editbookmodalbtn")[0]
const editbookname = document.getElementsByClassName("editbookname")[0]
const editbookauthor = document.getElementsByClassName("editbookauthor")[0]
const editbookpublisher = document.getElementsByClassName("editbookpublisher")[0]
const editbook = document.getElementsByClassName("editbook")[0]
const editbookcancle = document.getElementsByClassName("editbookcancle")[0]

let booklistinfo = []
let currentBookId = 0

/**
 * 向后端请求图书列表
 */
function getBookList() {
    fetch("https://hmajax.itheima.net/api/books?creator=godxu", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json()).then(data => {
        // console.log(data)
        booklistinfo = data.data
        // console.log(booklistinfo[0])
        resetBookList()
    }).catch(error => {
        // 处理请求错误
        console.error('Error:', error)
    })
}
getBookList()

/**
 * 刷新图书列表
 */
function resetBookList() {
    booklist.innerHTML = ''
    for (let i = 0; i < booklistinfo.length; i++) {
        const book = booklistinfo[i];
        const tr = document.createElement("tr")
        tr.innerHTML = `
            <th scope="row" class="fw-normal">${book.id}</th>
            <td>${book.bookname}</td>
            <td>${book.author}</td>
            <td>${book.publisher}</td>
            <td>
                <button class="delbtn mx-1" data-id="${book.id}">删除</button>
                <button class="editbtn" data-id="${book.id}">编辑</button>
            </td>
        `
        booklist.appendChild(tr)
    }
    const delbtns = document.getElementsByClassName("delbtn")
    const editbtns = document.getElementsByClassName("editbtn")

    for (let i = 0; i < editbtns.length; i++) {
        editbtns[i].addEventListener("click", () => {
            // console.log(editbtns[i].dataset.id)
            editbookmodalbtn.click()
            editbookname.value = booklistinfo[i].bookname
            editbookauthor.value = booklistinfo[i].author
            editbookpublisher.value = booklistinfo[i].publisher
            currentBookId = delbtns[i].dataset.id
        })
    }

    for (let i = 0; i < delbtns.length; i++) {
        delbtns[i].addEventListener("click", () => {
            // console.log(delbtns[i].dataset.id)
            currentBookId = delbtns[i].dataset.id
            delBook()
            
        })
    }
}

/**
 * 点击确认修改图书信息
 */
editbook.addEventListener("click", () => {
    let bookinfo = {
        bookname: editbookname.value,
        author: editbookauthor.value,
        publisher: editbookpublisher.value,
        creator: "godxu"
    }
    if (bookinfo.bookname == "" || bookinfo.author == "" || bookinfo.publisher == "") {
        alert("数据不合法")
    } else {
        fetch(`https://hmajax.itheima.net/api/books/${currentBookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookinfo)
        }).then(response => response.json()).then(data => {
            // console.log(data)
            if (data.message == "修改图书成功") {
                alert("修改图书成功")
            } else {
                alert("出错了")
            }
            getBookList()
        }).catch(error => {
            console.log('Error:', error)
        })
        editbookcancle.click()
    }
    // console.log(bookinfo)
})

/**
 * 点击确认删除图书
 */
function delBook() {
    const params = new URLSearchParams()
    params.set("bookid", currentBookId)
    fetch(`https://hmajax.itheima.net/api/books/${currentBookId}`, {
        method: 'DELETE',
        body: params
    }).then(response => response.json()).then(data => {
        console.log(data)
        if (data.message == "删除图书成功") {
            alert("删除图书成功")
        } else {
            alert(data.message)
        }
        getBookList()
    })
}