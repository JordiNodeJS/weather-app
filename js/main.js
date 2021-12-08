import apis from './apis.js'
import paises from './paises.js'
import dom from './dom.js'

dom.form.addEventListener('submit', searchCity)
dom.city.addEventListener('focus', () => clearInterval(autoclickId))

function searchCity(e) {
  e.preventDefault()

  const url = `${apis.API_URL}?q=${dom.city.value.trim()}&appid=${
    apis.API_KEY
  }&lang=es&units=metric`

  fetch(url)
    .then(res => res.json())
    .then(data => {
      dom.cityweather.textContent = `🏙 ${data.name ?? 'Escribe una ciudad 💩'}`
      dom.small.textContent = 'PAÍS: ' + data.sys.country
      dom.description.textContent = '📢' + data.weather[0].description
      dom.icon.src = `${apis.IMG_WEATHER}${data.weather[0].icon}@2x.png`
      dom.humidity.textContent = `💧 humedad: ${data.main.humidity} %`
      dom.wind.textContent = `🪁 viento: ${data.wind.speed} metros/seg`
      dom.temp.textContent = `☁ temperatura: ${data.main.temp} ºC`
      dom.feels_like.textContent = `🥶 sensación térmica: ${data.main.feels_like} ºC`
    })
    .catch(err => {
      console.log('💩💩💩')
      dom.small.textContent = '😡 Introduce el nombre de una ciudad 😡'
    })
}

function autoClick() {
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  dom.city.value = paises[Math.floor(Math.random() * paises.length - 1)]
  const search = document.querySelector('input[type="submit"]')
  search.dispatchEvent(event)
}
const autoclickId = setInterval(autoClick, 30000)