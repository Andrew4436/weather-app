import { useEffect, useRef, useState } from "react";
import { API_KEY } from "./api_key";
import "./style.css";
import DisplayWeather from "./components/DisplayWeather";

function App() {
  return (
    <div className="App">
      <div className="cover"></div>   
      <DisplayWeather />
    </div>
  );
}

export default App;
