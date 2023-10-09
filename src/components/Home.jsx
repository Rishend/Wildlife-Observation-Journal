import React, { useEffect } from "react";
import mylogo from "../logo.svg";

const Home = () => {
  let name = "Rishendra";

  let num1 = 40;
  let num2 = 60;

  const addnums = (a, b) => {
    return a + b;
  };

  return (
    <div className="home-bg">
      <div class="background--custom"></div>
      {/* <svg
        className="background--custom"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          fill="#FF0"
          fillOpacity={0.7}
          d="M-100-100h300V50h-300z"
          style={{
            animation: "path0 5s linear infinite alternate",
          }}
        />
        <path
          fill="#0FF"
          fillOpacity={0.7}
          d="M-100-100h300V50h-300z"
          style={{
            animation: "path1 12.5s linear infinite alternate",
          }}
        />
        <path
          fill="#F0F"
          fillOpacity={0.2}
          d="M-100-100h300V20h-300z"
          style={{
            animation: "path2 30s linear infinite alternate",
          }}
        />
      </svg> */}

      <div className="container py-5">
        <div className="card glass-card">
          <div className="card-body p-5">
            <h1>Welcome to Home Page</h1>
            <h1
              style={{
                color: "red",
                backgroundColor: "yellow",
                fontSize: "50px",
              }}
            >
              Using Inline CSS
            </h1>
            {name}
            <h3>
              Product of {num1} and {num2} is {num1 * num2}
            </h3>
            <h1>{addnums(26375, 827)}</h1>
            <p className="myclass">className is used instead of class in JSX</p>

            <input type="text" />
            <br />

            <img src="/logo192.png" alt="" />

            {mylogo}

            <img src={mylogo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;