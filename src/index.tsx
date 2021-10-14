import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/styles.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";

const stripePromise = loadStripe(
  "pk_test_51GxPy7BMmNF7e899tXTrH6gPLZ00UvXSmp5GrmLekyCY9i00aTwMXqIHWjWUBLwQiDPVpAMCt3BbzAfGWlw7NRoI00rnGy3DzH"
);
ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Elements>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
