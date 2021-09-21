import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./Cans.module.css";
import Can from "./Can";
import NewCanForm from "./NewCanForm";

import { BACKEND_URL } from "../../utilities/constants.js";

const Cans = () => {
  const [cansFromBackend, setCansFromBackend] = useState([]);

  useEffect(() => {
    fetch(BACKEND_URL + "api/cans", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCansFromBackend((state) => [...state, ...data.data]);
        return data;
      });
  }, []);

  return (
    <Card>
      <h1>This is the list of cans</h1>
      <NewCanForm />
      {cansFromBackend.map((can) => (
        <Can item={can.item} quantity={can.quantity} key={can.id} />
      ))}
    </Card>
  );
};

export default Cans;
