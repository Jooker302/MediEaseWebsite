import React from "react";
import Link from "next/link";

const page404 = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="robot-error"
        viewBox="0 0 260 118.9"
        role="img"
      >
    

        <defs>
          <clipPath id="white-clip">
            <circle id="white-eye" fill="#cacaca" cx="130" cy="65" r="20" />{" "}
          </clipPath>
          <text id="text-s" className="error-text" y="106">
            {" "}
            404{" "}
          </text>
        </defs>
        <path
          className="alarm"
          fill="#e62326"
          d="M120.9 19.6V9.1c0-5 4.1-9.1 9.1-9.1h0c5 0 9.1 4.1 9.1 9.1v10.6"
        />
        <use xlinkHref="#text-s" x="-0.5px" y="-1px" fill="black"></use>
        <use xlinkHref="#text-s" fill="#2b2b2b"></use>
        <g id="robot">
          <g id="eye-wrap">
            <use xlinkHref="#white-eye"></use>
            <circle
              id="eyef"
              className="eye"
              clip-path="url(#white-clip)"
              fill="#000"
              stroke="#2aa7cc"
              stroke-width="2"
              stroke-miterlimit="10"
              cx="130"
              cy="65"
              r="11"
            />
            <ellipse
              id="white-eye"
              fill="#2b2b2b"
              cx="130"
              cy="40"
              rx="18"
              ry="12"
            />
          </g>
          <circle
            className="lightblue"
            cx="105"
            cy="32"
            r="2.5"
            id="tornillo"
          />
          <use xlinkHref="#tornillo" x="50"></use>
          <use xlinkHref="#tornillo" x="50" y="60"></use>
          <use xlinkHref="#tornillo" y="60"></use>
        </g>
      </svg>
      <h1>Opps! No Route Found</h1>
      <h2>
        Go{" "}
        <Link href="/">
          Home!
        </Link>
      </h2>
    </div>
  );
};

export default page404;
