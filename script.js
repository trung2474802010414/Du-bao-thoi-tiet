const API_KEY = "9bcfab95cc6ccdc71c664574e4658118";

//   DỮ LIỆU KHU VỰC - TỈNH

const regions = {
    Bắc: [
        "Hanoi",
        "Hai Phong",
        "Quang Ninh",
        "Bac Ninh",
        "Hai Duong",
        "Thai Binh",
        "Nam Dinh",
        "Vinh Phuc"
    ],

    Trung: [
        "Thanh Hoa",
        "Nghe An",
        "Ha Tinh",
        "Quang Binh",
        "Quang Tri",
        "Hue",
        "Da Nang"
    ],

    Nam: [
        "Ho Chi Minh",
        "Binh Duong",
        "Dong Nai",
        "Can Tho",
        "An Giang",
        "Kien Giang",
        "Ca Mau"
    ]
};


//   DỮ LIỆU QUẬN / HUYỆN

const districts = {
    "Hanoi": [
        "Ba Dinh",
        "Hoan Kiem",
        "Cau Giay",
        "Ha Dong",
        "Long Bien"
    ],

    "Ho Chi Minh": [
        "Quận 1",
        "Quận 3",
        "Quận 7",
        "Bình Thạnh",
        "Thủ Đức"
    ],

    "Da Nang": [
        "Hai Chau",
        "Thanh Khe",
        "Lien Chieu",
        "Son Tra"
    ]
};


//   LẤY ELEMENT HTML

const regionSelect = document.getElementById("region");
const citySelect = document.getElementById("city");
const districtSelect = document.getElementById("district");


//   CHỌN KHU VỰC → HIỆN TỈNH


regionSelect.addEventListener("change", function () {

    citySelect.innerHTML = '<option value="">-- Chọn tỉnh/thành --</option>';
    districtSelect.innerHTML = '<option value="">-- Chọn quận/huyện --</option>';

    const region = this.value;

    if (!regions[region]) return;

    regions[region].forEach(function (city) {

        const option = document.createElement("option");

        option.value = city;
        option.textContent = city;

        citySelect.appendChild(option);

    });

});


//   CHỌN TỈNH → HIỆN QUẬN

citySelect.addEventListener("change", function () {

    districtSelect.innerHTML = '<option value="">-- Chọn quận/huyện --</option>';

    const city = this.value;

    if (!districts[city]) return;

    districts[city].forEach(function (district) {

        const option = document.createElement("option");

        option.value = district;
        option.textContent = district;

        districtSelect.appendChild(option);

    });

});


//   HÀM LẤY ICON THỜI TIẾT

function getWeatherIcon(weather) {

    weather = weather.toLowerCase();

    if (weather.includes("clear")) {
        return "☀️";
    }

    if (weather.includes("cloud")) {
        return "☁️";
    }

    if (weather.includes("rain")) {
        return "🌧";
    }

    if (weather.includes("drizzle")) {
        return "🌦";
    }

    if (weather.includes("thunderstorm")) {
        return "⛈";
    }

    if (weather.includes("snow")) {
        return "❄️";
    }

    if (
        weather.includes("mist") ||
        weather.includes("fog") ||
        weather.includes("haze")
    ) {
        return "🌫";
    }

    return "🌡";
}


//   LẤY THỜI TIẾT TỪ API

async function getWeather() {

    const city = citySelect.value;
    const district = districtSelect.value || "Không chọn";

    if (city === "") {
        alert("Vui lòng chọn tỉnh/thành");
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}&lang=vi`;

    try {

        const response = await fetch(url);
        const result = await response.json();

        if (result.cod !== 200) {

            document.getElementById("weather").innerHTML =
                "Không tìm thấy dữ liệu";

            return;
        }

        const weatherDesc = result.weather[0].description;
        const icon = getWeatherIcon(weatherDesc);

        document.getElementById("weather").innerHTML = `

            <h2>${result.name}</h2>

            <p>Quận/Huyện: ${district}</p>

            <h3>${icon} ${weatherDesc}</h3>

            <p>Nhiệt độ: ${result.main.temp} °C</p>

            <p>Độ ẩm: ${result.main.humidity}%</p>

            <p>Gió: ${(result.wind.speed * 3.6).toFixed(1)} km/h</p>

        `;

    } catch (error) {

        console.log(error);

    }

}


//   ĐỒNG HỒ THỜI GIAN THỰC

function updateClock() {

    const now = new Date();

    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("clock").innerText =
        `🕒 ${h}:${m}:${s}`;

}

setInterval(updateClock, 1000);

updateClock();