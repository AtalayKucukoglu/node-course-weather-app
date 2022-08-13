const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationResult = document.querySelector('#location')
const forecastResult = document.querySelector('#forecast')
const errorMessage = document.querySelector('#error')

weatherForm.addEventListener('submit', e => {
  e.preventDefault()
  console.log("form submitted")
  const address = search.value

  fetch('/weather?&address=' + address)
    .then(res => {
      res.json()
        .then(data => {
          console.log(data)
          if (data.error) {
            errorMessage.textContent = data.error
            forecastResult.textContent = ''
            locationResult.textContent = ''
            return
          }
          const { forecast = '', location = '' } = data;
          errorMessage.textContent = ''
          forecastResult.textContent = forecast
          locationResult.textContent = location
        })
    })
})