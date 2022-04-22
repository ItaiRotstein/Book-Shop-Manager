'use strict'

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function makeLorem(wordCount = 75) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function makeTitle(wordCount = getRandomIntInclusive(1, 2)) {
    const words = ['The', 'sky', 'above', 'the', 'port', 'was', 'the color of', 'tuned', 'to', 'a dead', 'All', 'this happened', 'more', 'or', 'less', 'I', 'had', 'the story', 'bit by bit', 'from', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getLink() {
    var links = [
        ['https://images-na.ssl-images-amazon.com/images/I/41gdH24kcjL._SX322_BO1,204,203,200_.jpg'],
        ['https://images-na.ssl-images-amazon.com/images/I/51M87XVQndL._SX386_BO1,204,203,200_.jpg'],
        ['https://images-na.ssl-images-amazon.com/images/I/418WHgXaCUS._SX309_BO1,204,203,200_.jpg']
    ]
    var randIdx = getRandomIntInclusive(0, 2)
    return links[randIdx]
    
}

function makePrice() {
    return getRandomIntInclusive(10, 20) + +Math.random().toFixed(2)
}