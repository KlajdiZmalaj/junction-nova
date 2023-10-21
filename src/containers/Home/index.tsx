import Header from "@/components/Header";
import "./style.scss";
import Buildings from "./Buildings";
import React from "react";

export default () => {
  return (
    <div className="home">
      <Header />
      <Buildings />
    </div>
  );
};
