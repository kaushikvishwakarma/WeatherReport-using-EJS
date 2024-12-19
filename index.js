import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));

const API_URL = `https://api.openweathermap.org/data/2.5/weather?`;
const API_KEY ="a217d570c4c9135110a0dd5bfd429a19";
const dataa={
  Name:"waiting for data...",
  weather: "waiting for data...",
  current_temp:"waiting for data...",
  humidity: "waiting for data...",
  temp_min: "waiting for data...",
  temp_max: "waiting for data...",

}
app.get("/", (req, res) => {
  res.render("index.ejs", dataa);
});

app.post("/get-data", async (req, res) => {
  const city=req.body.city;
  try {
    const result = await axios.get(API_URL+`q=${city}&appid=${API_KEY}&units=metric`);
        
    
    res.render("index.ejs", { 
      Name:result.data.name,
      weather: result.data.weather[0].description,
      current_temp:result.data.main.temp,
      humidity: result.data.main.humidity,
      temp_min: result.data.main.temp_min,
      temp_max: result.data.main.temp_max,
     });

  } catch (error) {
    res.render("index.ejs", { 
      Name:"Wrong input! ReCheck your input",
      weather: "waiting for data...",
      current_temp:"waiting for data...",
      humidity: "waiting for data...",
      temp_min: "waiting for data...",
      temp_max: "waiting for data...",
     });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
