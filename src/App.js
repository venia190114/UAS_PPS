import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Orders from "./components/Orders";
import "./style.css";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col-9">
            <Orders />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
