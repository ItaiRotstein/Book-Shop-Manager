'use strict'

const STORAGE_KEY = 'booksDB'
const TABLE_SIZE = 5

var gBooks
var gSortBy
var gPageIdx = 0

_createbooks()

function getBooksForDisplay() {
    var books = (gSortBy === 'title') ? _sortByTitle() : _sortByPrice()

    const idxStart = gPageIdx * TABLE_SIZE
    books = books.slice(idxStart, idxStart + TABLE_SIZE)
    return books
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    if (bookIdx === -1) return
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}

function addBook(title, price) {
    const book = _createBook(title, price)
    gBooks.unshift(book)
    _saveBooksToStorage()
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function updateBook(bookId, newPrice) {
    const book = getBookById(bookId)
    book.price = newPrice
    _saveBooksToStorage()
}

function setRate(diff, book) {
    if (book.rate + diff > 10 || book.rate + diff < 0) return
    book.rate += diff
    _saveBooksToStorage()
}

function setSortBy(sortBy) {
    gSortBy = (sortBy === 'title') ? 'title' : 'price'
}

function getPageIdx() {
    return gPageIdx
}

function getPagesLength() {
    var length = Math.ceil(gBooks.length / TABLE_SIZE)
    return length
}

function setNextPageIdx(diff) {
    gPageIdx += diff
    return gPageIdx
}

function setPageIdx(pageNum) {
    gPageIdx = pageNum - 1
    return gPageIdx
}

function _sortByTitle() {
    gBooks.sort((book1, book2) => {
        if (book1.title.toLowerCase() > book2.title.toLowerCase()) return 1
        if (book2.title.toLowerCase() > book1.title.toLowerCase()) return -1
        return 0
    })
    return gBooks
}

function _sortByPrice() {
    gBooks.sort((book1, book2) => {
        return book1.price - book2.price
    })
    return gBooks
}

function _createbooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []

        for (let i = 0; i < 15; i++) {
            books.push(_createBook())
        }
    }
    gBooks = books;
    _saveBooksToStorage()
}

function _createBook(title, price, rate = 0) {
    return {
        id: makeId(),
        title: title || makeTitle(),
        price: price || makePrice(),
        rate: getRandomIntInclusive(0, 10) || rate,
        desc: makeLorem(),
        imgUrl: getLink()
    }
}


function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

