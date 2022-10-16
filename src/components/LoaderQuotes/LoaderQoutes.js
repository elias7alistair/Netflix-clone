import React from "react";
import "./loaderQuotes.css";

const quote = [
  "Welcome to Alistair's Netflix Project..",
  "Hope you have a good time here",

  "Loading, Please wait!",
];

function LoaderQoutes() {
  return (
    <>
      {/* <h1>WHO AM I</h1> */}
      <div id="container">
        <div class="whoiam">
          {quote.map((data) => {
            return <h2 className="animatedh2">{data}</h2>;
          })}
          {/* <h2>Welcome to AListair's Netflix</h2>
      <h2>Hope you have a good time here</h2>
      <h2>Nothing like</h2>
      <h2>Loaing,Please wait!</h2> */}
        </div>
      </div>
    </>
  );
}

export default LoaderQoutes;
