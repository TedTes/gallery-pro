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
              />
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
