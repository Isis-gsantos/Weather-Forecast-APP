const chaveDaApi = "d9100e7e32c7468aab911322232311";

const searchButton = document.querySelector(".btn-search");
const inputSearch = document.getElementById("input-search");

searchButton.addEventListener("click", async () => {
    await searchAndFillData();
});

inputSearch.addEventListener("keyup", async (event) => {
    if (event.key === 'Enter') {
        await searchAndFillData();
    }
});

async function searchAndFillData() {
    const city = inputSearch.value;

    if (!city) return;

    const data = await searchCityData(city);

    if (data) fillData(data, city);
}

async function searchCityData(city) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${city}&aqi=no&lang=en`;

    const answer = await fetch(apiUrl);

    if (answer.status !== 200) return;

    const data = await answer.json();

    return data;
}

function fillData(data, city) {
    const temperature = data.current.temp_c;
    const condition = data.current.condition.text;
    const humidity = data.current.humidity;
    const windSpeed = data.current.wind_kph;
    const iconCondition = data.current.condition.icon;

    document.getElementById("city").textContent = city;
    document.getElementById("temperature").textContent = `${temperature} ºC`;
    document.getElementById("condition").textContent = condition;
    document.getElementById("humidity").textContent = `${humidity}%`;
    document.getElementById("wind-speed").textContent = `${windSpeed}km/h`;
    document.getElementById("icon-condition").setAttribute("src", iconCondition);
}
