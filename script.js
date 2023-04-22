// Store the Html elements
const latitudeElement = document.getElementById('lat');
const longitudeElement = document.getElementById('lon');
const tableEl = document.getElementById('allData');
const mapBox = document.getElementById('mapBox');


let latitude;
let longitude;
const apiKey = `08d38c5694fd7a8b0417ae5b6c7edacf`;

const run = function () {
  navigator.geolocation.getCurrentPosition((currentPosition) => {
    latitude = currentPosition.coords.latitude;
    longitude = currentPosition.coords.longitude;

    latitudeElement.textContent += " " + latitude;
    longitudeElement.textContent += " " + longitude;
    console.log('latitude: ', latitude, 'longitude: ', longitude);

    liveMap(latitude, longitude);
    function liveMap(latitude, longitude) {
      const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`;
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', mapUrl);
      iframe.setAttribute('width', '100%');
      iframe.setAttribute('height', '100%');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('style', 'border:0');
      mapBox.appendChild(iframe);
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
      .then((res) => res.json())
      .then((allData) => {
        const html = `
        <tr>
        <td>Location:  ${allData.name}</td>
        </tr>
        <tr>
        <td>Lat:  ${latitude}</td>
        <td>Long:  ${longitude}</td>
        </tr>
        <tr>
        <td>Timezone:  ${allData.timezone}</td>
        </tr>
        <tr>
        <td>Wind Speed:  ${allData.wind.speed}</td>
        </tr>
        <tr>
        <td>Humidity:  ${allData.main.humidity}</td>
        </tr>
        <tr>
        <td>Wind Direction(in deg):  ${allData.wind.deg}</td>
        </tr>
        <tr>
        <td>Pressure:  ${allData.main.pressure}</td>
        </tr>
        <tr>
        <td>Feels Like:${allData.main.feels_like}</td>
        </tr>
        `
        tableEl.innerHTML = html;
        // console.log('open weather data: ', allData)
      }).catch((error) => alert(error.message))
  }, () => {
    alert('Sorry could not detect your current location.')
  })
}

run();
