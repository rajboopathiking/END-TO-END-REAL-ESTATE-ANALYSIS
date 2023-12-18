import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  //const baseURL = "/predict";
  const [resStatus, SetResStatus] = useState(false);
  const [response, setResponse] = useState(0);
  const [data, setData] = useState({
    deal: 0,
    property: 0,
    area: 0,
    saleMonth: "",
    saleWeekday: 0,
    birthYear: 0,
    birthMonth: "",
    birthWeekday: 0,
    age: 0,
  });
  const allowedBirthYear = [
    1983, 1986, 1932, 1946, 1950, 1955, 1978, 1951, 1982, 1936, 1979, 1981,
    1943, 1949, 1948, 1980, 1953, 1985, 1942, 1972, 1960, 1933, 1954, 1940,
    1971, 1970, 1964, 1931, 1973, 1965, 1952, 1976, 1937, 1963, 1958, 1938,
    1967, 1977, 1939, 1941, 1956, 1966, 1975, 1969, 1947, 1957, 1974, 1959,
    1962, 1968,
  ]
    .sort()
    .reverse();
  const handlePostData = async () => {
    try {
      const resp = await axios.post("http://localhost:5000/predict", data);
      console.log("Response from backend:", resp);
      setResponse(resp.data.prediction);
      SetResStatus(true);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  const allowedDeals = [1, 2, 3, 4, 5];
  const Weekdays = [1, 2, 3, 4, 5, 6, 7];
  const Months = [
    { v: 1, m: "January" },
    { v: 2, m: "Febraury" },
    { v: 3, m: "March" },
    { v: 4, m: "April" },
    { v: 5, m: "May" },
    { v: 6, m: "June" },
    { v: 7, m: "July" },
    { v: 8, m: "August" },
    { v: 9, m: "September" },
    { v: 10, m: "Octobar" },
    { v: 11, m: "November" },
    { v: 12, m: "December" },
  ];
  useEffect(() => {
    console.log("rendered");
  }, [handlePostData]);

  return (
    <>
      <div className={`main flex justify-around ease-in-out items-center`}>
        <div className="self-container border-r-2 w-1/3 h-screen flex flex-col justify-center">
          <h1 className="h1 text-lg font-bold border-b-2 m-2 inline w-fit border-blue-700">RealEstate Analysis</h1>
          <p className="p-2">
            <span className="text-lg ml-8 font-bold text-blue-700">T</span>his Project based on realestate
            related factors used to determine the price . I done data cleaning
            and preprocessing and analysis and modeling after i deploy the model
            on front-end website.and deploy it.
          </p>
        </div>
        <div className="form-container">
          <form
            action="#"
            method="get"
            onSubmit={(e) => {
              console.log(data);
              e.preventDefault();
              handlePostData();
            }}
          >
            <div className="form-elements grid grid-rows-9 gap-3 p-5 m-2 drop-shadow-md rounded-md border">
              <div className="form-element grid grid-cols-2">
                <label className="m-5 row-span-1" htmlFor="deal_satisfaction">
                  Deal Satisfaction
                </label>
                <select
                  className="form-control pl-2 border rounded-[5px] w-72 h-10  row-span-2"
                  id="sale_month"
                  onChange={(e) => {
                    setData({
                      deal: parseInt(e.target.value),
                      property: data.property,
                      area: data.area,
                      saleMonth: data.saleMonth,
                      saleWeekday: data.saleWeekday,
                      birthYear: data.birthYear,
                      birthMonth: data.birthMonth,
                      birthWeekday: data.birthWeekday,
                      age: data.age,
                    });
                  }}
                >
                  {allowedDeals.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-element grid grid-cols-2">
                <label className="m-5" htmlFor="property">
                  Property
                </label>
                <input
                  required
                  type="text"
                  name="property"
                  className="form-control pl-2 border rounded-[5px] w-72 h-10  row-span-2"
                  id="property"
                  onChange={(e) => {
                    setData({
                      deal: data.deal,
                      property: parseFloat(e.target.value),
                      area: data.area,
                      saleMonth: data.saleMonth,
                      saleWeekday: data.saleWeekday,
                      birthYear: data.birthYear,
                      birthMonth: data.birthMonth,
                      birthWeekday: data.birthWeekday,
                      age: data.age,
                    });
                  }}
                  placeholder="Property"
                />
              </div>
              <div className="form-element grid grid-cols-2">
                <label className="m-5" htmlFor="area">
                  Area
                </label>
                <input
                  required
                  name="area"
                  type="text"
                  onChange={(e) => {
                    setData({
                      deal: data.deal,
                      property: data.property,
                      area: parseFloat(e.target.value),
                      saleMonth: data.saleMonth,
                      saleWeekday: data.saleWeekday,
                      birthYear: data.birthYear,
                      birthMonth: data.birthMonth,
                      birthWeekday: data.birthWeekday,
                      age: data.age,
                    });
                  }}
                  className="form-control pl-2 border rounded-[5px] w-72 h-10  row-span-2"
                  id="area"
                  placeholder="Area"
                />
              </div>
              <div className="form-element grid grid-cols-2">
                <label className="m-5" htmlFor="sale_month">
                  Sale Month
                </label>
                <select
                  className="form-control pl-2 border rounded-[5px] w-72 h-10  row-span-2"
                  id="sale_month"
                  onChange={(e) => {
                    setData({
                      deal: data.deal,
                      property: data.property,
                      area: data.area,
                      saleMonth: parseInt(e.target.value),
                      saleWeekday: data.saleWeekday,
                      birthYear: data.birthYear,
                      birthMonth: data.birthMonth,
                      birthWeekday: data.birthWeekday,
                      age: data.age,
                    });
                  }}
                >
                  {Months.map((item,index)=>{
                    return <option key={index} value={item.v}>{item.m}</option>
                  })}
                </select>
              </div>
              <div className="form-element grid grid-cols-2">
                <label className="m-5" htmlFor="sale_weekday">
                  Sale Weekday
                </label>
                <select
                  className="form-control pl-2 border rounded-[5px] w-72 h-10  row-span-2"
                  id="sale_weekday"
                  onChange={(e) => {
                    setData({
                      deal: data.deal,
                      property: data.property,
                      area: data.area,
                      saleMonth: data.saleMonth,
                      saleWeekday: parseInt(e.target.value),
                      birthYear: data.birthYear,
                      birthMonth: data.birthMonth,
                      birthWeekday: data.birthWeekday,
                      age: data.age,
                    });
                  }}
                >
                  {Weekdays.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-element grid grid-cols-2">
                <label className="m-5" htmlFor="birth_year">
                  Birth Year
                </label>
                <select
                  className="form-control pl-2 border rounded-[5px] w-72 h-10  row-span-2"
                  id="birth_year"
                  onChange={(e) => {
                    setData({
                      deal: data.deal,
                      property: data.property,
                      area: data.area,
                      saleMonth: data.saleMonth,
                      saleWeekday: data.saleWeekday,
                      birthYear: parseInt(e.target.value),
                      birthMonth: data.birthMonth,
                      birthWeekday: data.birthWeekday,
                      age: data.age,
                    });
                  }}
                >
                  {allowedBirthYear.map((year, index) => {
                    return (
                      <option key={index} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-element grid grid-cols-2">
                <label className="m-5" htmlFor="birth_month">
                  Birth Month
                </label>
                <select
                  className="form-control pl-2 border rounded-[5px] w-72 h-10  row-span-2"
                  id="birth_month"
                  onChange={(e) => {
                    setData({
                      deal: data.deal,
                      property: data.property,
                      area: data.area,
                      saleMonth: data.saleMonth,
                      saleWeekday: data.saleWeekday,
                      birthYear: data.birthYear,
                      birthMonth: parseInt(e.target.value),
                      birthWeekday: data.birthWeekday,
                      age: data.age,
                    });
                  }}
                >
                  {Months.map((item,index)=>{
                    return <option key={index} value={item.v}>{item.m}</option>
                  })}
                </select>
              </div>
              <div className="form-element grid grid-cols-2">
                <label className="m-5" htmlFor="birth_weekday">
                  Birth Weekday
                </label>
                <select
                  className="form-control pl-2 border rounded-[5px] w-72 h-10  row-span-2"
                  id="birth_weekday"
                  onChange={(e) => {
                    setData({
                      deal: data.deal,
                      property: data.property,
                      area: data.area,
                      saleMonth: data.saleMonth,
                      saleWeekday: data.saleWeekday,
                      birthYear: data.birthYear,
                      birthMonth: data.birthMonth,
                      birthWeekday: parseInt(e.target.value),
                      age: data.age,
                    });
                  }}
                >
                  {Weekdays.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-element grid grid-cols-2">
                <label className="m-5" htmlFor="age">
                  Age
                </label>
                <input
                  required
                  className="form-control pl-2 border rounded-[5px] w-72 h-10"
                  type="text"
                  name="age"
                  id="age"
                  placeholder="Your Age"
                  onChange={(e) => {
                    setData({
                      deal: data.deal,
                      property: data.property,
                      area: data.area,
                      saleMonth: data.saleMonth,
                      saleWeekday: data.saleWeekday,
                      birthYear: data.birthYear,
                      birthMonth: data.birthMonth,
                      birthWeekday: data.birthWeekday,
                      age: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
              <button className="btn bg-blue-600 text-white p-2 rounded mt-3 cursor-pointer">
                Analyse
              </button>
            </div>
          </form>
        </div>
        {resStatus ? (
          <div className="Result">
            <div className="res-container p-5 border rounded bg-blue-700 text-white">
              <h2 className="h-6 text-lg font-semibold underline inline">
                Result :{" "}
              </h2>
              <span className="ml-3">{response}</span>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
