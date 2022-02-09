const baseURL = "/";
let Axios;
(function() {
    Axios = axios.create({
        baseURL,
        timeout: 3000,
    })
})();
const loaderEle = document.getElementById("loader");
const loadWeatherReport = (weatherAddresses) => {
    loaderEle.style.display = "block";
    $("#weather-report").html("");
    Axios.get("weather?address=" + weatherAddresses)
      .then((pRes) => {
        if (pRes.data.error ) {
            $("#no-data").hide(100);
            $("#weather-report").html(`<div class="alert alert-danger">${pRes.data.error}</div>`); 
        } else {
            $("#no-data").hide(100);
            $("#weather-report").html(
              `<div class="alert alert-success">
                    <p><strong>Co-ordinate (Lat) </strong> : ${
                      pRes.data.coordinateData.lat
                    }, <strong>,(Long)</strong>: ${pRes.data.coordinateData.long}</p>
                    <p>
                        <strong>Weather cast:</strong>The weather is ${pRes.data.weather_cast.weather_descriptions.join(
                          ","
                        )}, The temperature is ${
                pRes.data.weather_cast.temperature
              } c and it feels like ${
                pRes.data.weather_cast.feelslike
              } c and humidity is ${pRes.data.weather_cast.humidity}. The wind speed is around ${pRes.data.weather_cast.wind_speed}, the visibility is ${pRes.data.weather_cast.visibility} and the pressure is ${pRes.data.weather_cast.pressure} M 
                    </p>
                </div>
                `
            );
        }
        loaderEle.style.display = "none";
        loaderEle.style.display = "none";
      })
      .catch((err) => {
        console.log(err);
        loaderEle.style.display = "none";
      });
}

const searchTypedWeather =(evt) => {
    if (evt.value) {
        loadWeatherReport(evt.value);
    } else {
       $("#no-data").show(100); 
    $("#weather-report").html("");
    }
}