import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";



const reactElement = {
  type: "a",
  props: {
    href: "https://google.com",
    target: "_blank",
  },
  children: "Click me to visit Google",
};

function MyApp() {
  return (
    <div>
      <h1>Custom React App</h1>
    </div>
  )
}
const AnotherElement = (
  <a href="http://google.com" target='_blank'>Click me to visit Google</a>

)

const aReactElement = React.createElement(
  "a",
  { href: "http://google.com", target: "_blank" },
  "Click me to visit Google"
)



ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);
