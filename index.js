const cryptoTop = document.getElementById("crypto-top");
const crypto = document.getElementById("crypto")

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url("${data.urls.regular})`
        document.getElementById("authorName").textContent = `
        By: ${data.user.name}
        ` 
        })
    .catch(err => {
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1470770903676-69b98201ea1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ2MTg4MjI&ixlib=rb-4.0.3&q=80&w=1080")`
        console.error(err)
    })

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        // console.log(data);
        cryptoTop.innerHTML = `
        <img src="${data.image.small}"/>
        <span>${data.name}</span>
        `
        crypto.innerHTML += `
        <p>🎯: $${data.market_data.current_price.usd}</p>
        <p>👆: $${data.market_data.high_24h.usd}</p>
        <p>👇: $${data.market_data.low_24h.usd}</p>
        `
        setInterval(() => {
            const currentTime = new Date();
            document.querySelector(".time").textContent = currentTime.toLocaleTimeString('en-US', { timeStyle: "medium"})
        }, 1000)
    })
    .catch( err => console.error(err))

    
navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`)
    .then(res => {
        if (!res.ok) {
            throw Error("Weather data not available")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("weather").innerHTML = `
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
        <p class="weather-temp">${data.main.temp}°C</p>
        <p class="weather-city">${data.name}</p>
        `;
    })
    .catch(err => console.error(err))
})