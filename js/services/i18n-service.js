'use strict'

const gTrans = {
    "welcome": {
        en: 'Welcome',
        es: 'bienvenidos',
        he: 'ברוכים הבאים'
    },
    "book-add": {
        en: 'Add book',
        es: 'Añadir libro',
        he: 'הוסף ספר'
    },
    "doc-title": {
        en: 'Book-Shop',
        es: 'librería',
        he: 'חנות ספרים'
    },
    "create-book": {
        en: 'Create-book',
        es: 'Crear libro',
        he: 'צור ספר חדש'
    },
    "book-id": {
        en: 'id',
        es: 'id',
        he: 'מספר סידורי'
    },
    "book-title": {
        en: 'Title',
        es: 'Titulo',
        he: 'שם הספר'
    },
    "book-price": {
        en: 'Price',
        es: 'Precio',
        he: 'מחיר'
    },
    "book-actions": {
        en: 'Actions',
        es: 'Acciones',
        he: 'פעולות'
    },
    "book-rate": {
        en: 'rate',
        es: 'calificar',
        he: 'דירוג'
    },
    "btn-read": {
        en: 'Read',
        es: 'Leer',
        he: 'לקרוא'
    },
    "btn-update": {
        en: 'Update',
        es: 'Actualizar ',
        he: 'עדכון'
    },
    "btn-delete": {
        en: 'Delete',
        es: 'Eliminar',
        he: 'למחוק'
    },
    "Sure?": {
        en: 'Sure?',
        es: 'Estas segura?',
        he: 'בטוח?'
    },
    "modal-close": {
        en: 'Close',
        es: 'Cerrar',
        he: 'סגור'
    },
}

var gCurrLang = 'en'

function getTrans(transKey) {
    // If key is unknown return 'UNKNOWN'
    var key = gTrans[transKey]
    if(!key) return 'UNKNOWN'
    
    // Get from gTrans
    const translate = key[gCurrLang]

    // If translation not found - use english
    if (!translate) return key['en']

    return translate
}

function doTrans() {
    // TODO: 
    // var els = document.querySelectorAll('[data-trans]')
    const els = document.querySelectorAll('[data-trans]')

    // for each el:
    //    get the data-trans and use getTrans to replace the innerText 
    //    ITP: support placeholder    

    els.forEach(el => {
        const transKey = el.dataset.trans
        const txt = getTrans(transKey)

        if (el.nodeName === 'INPUT') el.placeholder = txt
        else el.innerText = txt

        // if(el.classList.contains('price')) el.
    })
}


function setLang(lang) {
    gCurrLang = lang
    renderBooks()
}


function formatNumOlder(num) {
    return num.toLocaleString('es')
}


function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}


function formatCurrency(num) {
    return new Intl.NumberFormat(gCurrLang, { style: 'currency', currency: 'USD' }).format(num)
}


function formatDate(time) {
    const option = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    }

    return new Intl.DateTimeFormat(gCurrLang, option).format(time)
}


function kmToMiles(km) {
    return km / 1.609
}