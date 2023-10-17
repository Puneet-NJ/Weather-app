// Declare and initalize all the constants
const input = document.querySelector("input");
const form = document.querySelector("form");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const date = document.querySelector(".date");
const emoji = document.querySelector(".emoji");
const weatherType = document.querySelector(".weatherType");

// Function to fetch the data
const fetchData = (input) => {
	let target = input;
	let url = `http://api.weatherapi.com/v1/current.json?key=7eed2e85e03f412db5b134334231610&q=${target}`;

	const data = fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const {
				current: {
					temp_c,
					condition: { text, icon },
				},
				location: { name, localtime },
			} = data;

			console.log(data);
			console.log(icon);
			updateDOM(temp_c, name, localtime, icon, text);
		})
		.catch((e) => {
			alert("City not found!!");
		});
};
// Function to manipulate the DOM using the fetched data
const updateDOM = (temp_c, cityName, time, icon, nature) => {
	temp.innerText = temp_c + "°";
	city.innerText = cityName;
	date.innerText = time;
	emoji.src = icon;
	weatherType.innerText = nature;
};

// Making default city as gulbarga
fetchData("gulbarga");
// Taking the entered city by user and calling fetchData func
form.addEventListener("submit", (e) => {
	e.preventDefault();

	fetchData(input.value);
});
