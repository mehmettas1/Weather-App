import axios from "axios";
import React, { useState } from "react";
import WeatherCard from "./WeatherCard";

const Main = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherDataFromApi();
    // e.target.reset()
    setSearchText("");
    e.target.input.focus();
  };
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };


  const getWeatherDataFromApi = async () => {
    let apiKey = "00484987152255e2d06f78d9149a1649";
    let units = "metric";
    let lang = "tr";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${apiKey}&units=${units}&lang=${lang}`;

    try {
      const response = await axios.get(url);
      const { name, main, sys, weather, id } = response.data;
   
      let iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
      const isExist = data.some((card) => card.id === id);

             if (isExist) {
               setError(
                 `You already know the weather for ${name}, Please search for another city 😉`
               );
               setTimeout(() => {
                 setError("");
               }, 5000);
             } else {
               setData([{ name, main, sys, weather, id, iconUrl }, ...data]);
             }
    } catch (err) {
      console.log(err);
             setError(err.message);
             setTimeout(() => {
               setError("");
             }, 5000);
    }
  };

  return (
    <section className="main">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Search for a city"
          value={searchText}
          autoFocus
        />
        <button type="submit">SUBMIT</button>
        <span className="msg">{error}</span>
      </form>
      <div className="container">
        <ul className="cities">
          {data.map((item) => (
            <WeatherCard key={item.id} data={item} />

          ))}
        </ul>
      </div>
    </section>
  );
};

export default Main;

