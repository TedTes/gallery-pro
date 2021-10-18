import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = `https://jsonplaceholder.typicode.com`;

function App() {
  const _limit = 8;
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(5000);
  const [_start, setStart] = useState(0);

  useEffect(async () => {
    let data = await fetchData();
    setData(data);
  }, []);

  const handleClick = async (id) => {
    let val = localStorage.getItem(id) === "true" ? false : true;
    localStorage.setItem(id, val);
  };

  async function fetchData() {
    const url = `${BASE_URL}/photos?_start=${_start}&_limit=${_limit}`;
    let res = await axios.get(url);
    setTotal(5000);
    return res.data;
  }

  return (
    <div className="App">
      <div className="App-header">
        <div style={{ fontSize: "1.3em", fontWeight: "bold", opacity: ".9" }}>
          Gallery
        </div>
        <select className="selector" data-testid="selector">
          <option> All photos</option>
          <option> Favorites</option>
        </select>
      </div>
      <div className="images-container" data-testid="image-list">
        {data.length ? (
          data.map((dta, index) => (
            <div
              data-testid="image-item"
              key={index}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <img
                data-testid={dta.id}
                width="240"
                height="330"
                src={dta.url}
                alt={dta.title}
                onClick={() => handleClick(dta.id)}
              />
              <svg
                viewBox="0 0 100 100"
                style={{ marginTop: ".2em" }}
                width="19"
                height="19"
                onClick={() => handleClick(dta.id)}
              >
                <path
                  data-testid={`${dta.id}s`}
                  stroke="#A03232"
                  strokeWidth="3"
                  fill={
                    localStorage.getItem(dta.id) === "true" ? "red" : "white"
                  }
                  d="M50.3,87.7c2-4.3,9.5-12.8,18-18.8c10.2-7.2,26-13.2,25.9-30.2C94,7.6,60.9,2.6,50,28.3
		C38.5,1.6,6,7.8,5.7,38.8c-0.1,17,15.5,23.4,25.9,30.2C41.7,75.7,48.9,84.7,50,88.5C50.1,88.3,50.2,88,50.3,87.7"
                />
              </svg>
            </div>
          ))
        ) : (
          <h4 id="loading">Loading...</h4>
        )}
      </div>
    </div>
  );
}

export default App;
