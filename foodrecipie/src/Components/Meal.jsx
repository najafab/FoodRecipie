import React, { useEffect, useState } from "react";

const Meal = () => {
  const [meal, setMeal] = useState([]);
  const [Area, setArea] = useState("");
  const [inputData, setInputData] = useState("");

  // Fetch meals based on selected Area
  useEffect(() => {
    const fetchDataFromApi = async () => {
      if (Area) {
        const api = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`
        );
        const data = await api.json();
        console.log(data.meals);
        setMeal(data.meals || []);
      }
    };
    fetchDataFromApi();
  }, [Area]);

  // Fetch meals as user types in the input field
  useEffect(() => {
    const fetchMealsBySearch = async () => {
      if (inputData.trim()) {
        const api = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`
        );
        const data = await api.json();
        console.log(data.meals);
        setMeal(data.meals || []);
      } else {
        setMeal([]); // Clear meals if input is empty
      }
    };
    fetchMealsBySearch();
  }, [inputData]);

  return (
    <>
      {/* Area Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "12px",
        }}
      >
        <button
          type="button"
          onClick={() => setArea("Indian")}
          className="btn btn-outline-primary"
        >
          Indian
        </button>
        <button
          type="button"
          onClick={() => setArea("Canadian")}
          className="btn btn-outline-secondary"
        >
          Canadian
        </button>
        <button
          type="button"
          onClick={() => setArea("American")}
          className="btn btn-outline-success"
        >
          American
        </button>
        <button
          type="button"
          onClick={() => setArea("Thai")}
          className="btn btn-outline-danger"
        >
          Thai
        </button>
        <button
          type="button"
          onClick={() => setArea("British")}
          className="btn btn-outline-warning"
        >
          British
        </button>
        <button
          type="button"
          onClick={() => setArea("Russian")}
          className="btn btn-outline-info"
        >
          Russian
        </button>
      </div>

      {/* Search Input */}
      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search here..."
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid lightgray",
          }}
        />
      </div>

      {/* Meal Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          padding: "12px",
        }}
      >
        {meal.map((data) => (
          <div key={data.idMeal} style={{ textAlign: "center" }}>
            <div>
              <img
                src={data.strMealThumb}
                alt={data.strMeal}
                style={{
                  width: "200px",
                  border: "2px solid blue",
                  borderRadius: "10px",
                }}
              />
            </div>
            <h5>{data.strMeal}</h5>
          </div>
        ))}
      </div>
    </>
  );
};

export default Meal;
