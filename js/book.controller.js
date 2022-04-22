
function onInit() {
    console.log('init');
    renderBooks()
    doTrans()
    renderPaging()
}

function renderBooks() {
    var books = getBooksForDisplay()
    var strHTMLs = books.map(book => `
    <tr>
    <td>${book.id}</td>
    <td>${book.title}</td>
    <td class="price">${formatCurrency(book.price)}</td>
    <td class="td-rate">${book.rate}</td>
    <td class="actions">
        <button data-trans="btn-read" class="btn btn-primary btn-read" data-toggle="modal" href="#portfolioModal" onclick="onReadBook('${book.id}')">${getTrans('btn-read')}</button>
        <button data-trans="btn-update" class="btn btn-success btn-update" onclick="onUpdateBook('${book.id}')">${getTrans('btn-update')}</button>
        <button data-trans="btn-delete" class="btn btn-danger btn-delete" onclick="onRemoveBook('${book.id}')">${getTrans('btn-delete')}</button>
    </td>
    </tr>
    `)

    document.querySelector('.table tbody').innerHTML = strHTMLs.join('')
}

function renderPaging() {
    var elPageNum = document.querySelector('.page-num')
    var length = getPagesLength()
    var pageIdx = getPageIdx()
    console.log('pageIdx', pageIdx)

    var strHTML = ''
    for (var i = 0; i < length; i++) {
        var pageStatus = ''
        var className = ''
        if (i === pageIdx) {
            pageStatus = 'disabled'
            className = 'page-disabled'
        }
        strHTML += `<input class="${className}" ${pageStatus} type="button" value="${i + 1}" onclick="onSetPageNum(this)">`
    }
    elPageNum.innerHTML = strHTML
}

function renderModal(book) {
    var elModal = document.querySelector('.modal-body')
    var strHTML =
        `<img src="${book.imgUrl}">
    <h3 class="title">${book.title}</h3>
    <h3>Price $<span>${book.price}</span></h3>
    <h4>Rate</h4>
    <section class="change-rate">
        <button class="btn-primary" onclick="onSetRate(-1, '${book.id}')">-</button>
        <span>${book.rate}</span>
        <button class="btn-primary" onclick="onSetRate(1, '${book.id}')">+</button>
    </section>
    <h5>Book Description</h5>
    <p>${book.desc}</p>
    `
    // <button data-trans="modal-close" onclick="onCloseModal()">Close</button>

    elModal.innerHTML = strHTML
    // elModal.classList.add('open')

                          
}

function onAddBook(ev) {
    ev.preventDefault()

    const elTitle = document.querySelector('input[name=title]')
    const elPrice = document.querySelector('input[name=price]')

    if (!elTitle.value && !elPrice.value) return
    addBook(elTitle.value, elPrice.value)
    renderBooks()
    doTrans()
    renderPaging()

    elTitle.value = ''
    elPrice.value = ''

}

function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    var newPrice = prompt('Enter New Price: ', book.price)
    if (!newPrice) return
    updateBook(bookId, newPrice)
    renderBooks()
}

function onRemoveBook(bookId) {
    if (!confirm(getTrans('Sure?'))) return
    removeBook(bookId)
    renderBooks()
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var myModal = new bootstrap.Modal(document.querySelector('.modal'), {
        focus: true, 
        keyboard: true,
        backdrop: true
      })
    myModal.show('slow')
    renderModal(book)
}

function onSetRate(diff, bookId) {
    var book = getBookById(bookId)
    setRate(+diff, book)
    document.querySelector('.change-rate span').innerText = book.rate
    document.querySelector('.td-rate').innerText = book.rate
    renderBooks()
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}

function onSetSortBy(sortBy) {
    setSortBy(sortBy)
    renderBooks()
}

function onNextPage(diff) {
    var pageIdx = setNextPageIdx(diff)
    setPaging(pageIdx)
}

function onSetPageNum(pageBtn) {
    var pageIdx = setPageIdx(pageBtn.value)
    setPaging(pageIdx)
}

function setPaging(pageIdx) {
    var elPrev = document.querySelector('.prev')
    var elNext = document.querySelector('.next')

    var length = getPagesLength()

    if (pageIdx === length - 1) {
        elNext.disabled = true
        elPrev.disabled = false
        elNext.classList.add('disabled')
        elPrev.classList.remove('disabled')
    } else if (pageIdx === 0) {
        elNext.disabled = false
        elPrev.disabled = true
        elNext.classList.remove('disabled')
        elPrev.classList.add('disabled')
    } else {
        elNext.disabled = false
        elPrev.disabled = false
        elNext.classList.remove('disabled')
        elPrev.classList.remove('disabled')

    }
    renderBooks()
    doTrans()
    renderPaging()
}

function onSetLang(lang) {
    setLang(lang)

    if (lang === 'he') {
        document.body.classList.add('rtl')
        document.querySelector('.modal').classList.add('rtl')
    }
    else {
        document.body.classList.remove('rtl')
        document.querySelector('.modal').classList.remove('rtl')
    }

    doTrans()
}





