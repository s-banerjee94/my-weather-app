
console.log('Client side javaScript!')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')
console.log(search)

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetch('http://localhost:3000/weather?address=' + encodeURI(location)).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            msgOne.textContent = data.error
            console.log(data.error)
        } else {
            console.log('wind speed', data.windSpeed, 'temperature', data.temperature)
            msgOne.textContent = data.temperature
            msgTwo.textContent = data.windSpeed
        }
    })
})
    console.log(location)
})