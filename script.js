const cookie = document.getElementById('cookie')
const title = document.getElementById('title')
const footer = document.getElementById('footer')
cookie.childNodes[0].remove()
cookie.childNodes[1].remove()
cookie.childNodes[2].remove()
cookie.childNodes[3].remove()
const audio = [
    new Audio('https://gulkoa.github.io/Oreo/sounds/rempop.wav'),
    new Audio('https://gulkoa.github.io/Oreo/sounds/pop (1).wav'),
    new Audio('https://gulkoa.github.io/Oreo/sounds/pop (2).wav'),
    new Audio('https://gulkoa.github.io/Oreo/sounds/pop (3).wav'),
    new Audio('https://gulkoa.github.io/Oreo/sounds/pop (4).wav'),
    new Audio('https://gulkoa.github.io/Oreo/sounds/pop (5).wav'),
    new Audio('https://gulkoa.github.io/Oreo/sounds/pop (6).wav'),
    new Audio('https://gulkoa.github.io/Oreo/sounds/pop (7).wav'),
]

var cookieLayers = ['bot', 'mid', 'top']
var lastLayerIndex = 2


function addlayer(type) {
    try {
        audio[Math.floor(Math.random() * 7 + 1)].play()
    } catch (e) {
        console.error(e)
    }

    const newLayer = document.createElement('img')
    if (type == 'top')
    {
        newLayer.src = 'https://gulkoa.github.io/Oreo/img/oreo-top.png'
        newLayer.classList = 'oreo-top oreo-layer'
        addToTitle('o')
        cookieLayers.push('top')
    }
    else if (type == 'mid')
    {
        newLayer.src = 'https://gulkoa.github.io/Oreo/img/oreo-middle.png'
        newLayer.classList = 'oreo-middle oreo-layer'
        addToTitle('re')
        cookieLayers.push('mid')
    }
    else if (type == 'bot')
    {
        newLayer.src = 'https://gulkoa.github.io/Oreo/img/oreo-bottom.png'
        newLayer.classList = 'oreo-bottom oreo-layer'
        addToTitle('o')
        cookieLayers.push('bot')
    }

    newLayer.draggable = false
    newLayer.style = 'z-index: ' + (lastLayerIndex + 1) + ';'

    cookie.insertBefore(newLayer, cookie.childNodes[0]);

    lastLayerIndex++

    if (window.scrollY + 10 > window.scrollMaxY)
    setFooterOpacity(1)
    else
    setFooterOpacity(0)
}

function removeLayer() {
    if (lastLayerIndex >= 0)
    {
        audio[0].play()
        cookie.childNodes[0].classList += ' removing'
        setTimeout(() => {
            cookie.childNodes[0].remove()
        }, 250)
        if (cookieLayers.pop() == 'mid')
            remFromTitle(2)
        else
            remFromTitle(1)
            
        lastLayerIndex--
    }
}


title.onclick = () => {
    var utterance = new SpeechSynthesisUtterance(titleText)
    speechSynthesis.speak(utterance)
}


function clearAll() {
    if (cookieLayers.length >= 1)
    {
        audio[0].play()
        for (layer of cookie.childNodes) {
            layer.classList += ' removing'
        }
        setTimeout(() => {cookie.innerHTML = ''}, 200)
        title.textContent = ''
        titleText = ''
        cookieLayers = []
        lastLayerIndex = -1
        setFooterOpacity(1)
    }
}


var titleText = 'oreo'
function addToTitle(toAdd) {
    titleText = toAdd + titleText
    if (titleText.length > window.innerWidth / 31)
    {
        title.textContent = titleText.substring(0, window.innerWidth / 31) + '...'
    }
    else
        title.textContent = titleText

    document.title = titleText
}

function remFromTitle(amount) {
    titleText = titleText.substring(amount)
    if (titleText.length > window.innerWidth / 31)
    {
        title.textContent = titleText.substring(0, window.innerWidth / 31) + '...'
    }
    else
        title.textContent = titleText
}

function parseOreo(title) {
    originalLength = title.length
    i = 0
    while(title.length > 0) {
        if (title.substring(title.length - 1, title.length) == 'o') {
            if (i > originalLength / 2)
                addlayer('top')
            else
                addlayer('bot')
            title = title.substring(0, title.length - 1)
            i += 1
        }
        else if (title.length > 1 && (title.substring(title.length - 2, title.length) == 're')) {
            addlayer('mid')
            title = title.substring(0, title.length - 2)
            i += 2
        }
        else
            title = title.substring(0, title.length - 1)
            i += 1
    }
}

function randomOreo(minLayers, maxLayer) {
    clearAll()
    setTimeout(() => {
        const amountOfLayers = Math.floor(Math.random() * (maxLayer - minLayers + 1) + minLayers)
        const types = ['bot', 'mid', 'top']
        for (let i = 0; i < amountOfLayers; i++)
        {
            let type = Math.floor(Math.random() * 3)
            addlayer(types[type])
        }
    }, 250)
}

window.onscroll = () => {
    if (window.scrollY + 10 > window.scrollMaxY)
        setFooterOpacity(1)
    else
        setFooterOpacity(0)
}

function setFooterOpacity(opacity) {
    if (footer) {
        footer.style = 'opacity: ' + opacity
    }
}