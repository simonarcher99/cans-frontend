import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./Cans.module.css";
import Can from "./Can";
import NewCanForm from "./NewCanForm";

import { BACKEND_URL_2 } from "../../utilities/variables";

const Cans = () => {
  const [backendData, setBackendData] = useState("");
  const DUMMY_CANS = [
    { item: "Baked Beans", id: 1, quantity: 3 },
    { item: "Scoth Broth", id: 2, quantity: 5 },
    { item: "Chopped Tomatoes", id: 3, quantity: 2 },
    { item: "Chicked Peas", id: 4, quantity: 2 },
    { item: "Black Beans", id: 5, quantity: 2 },
  ];

  const url = "http://localhost:8000/api/";

  useEffect(() => {
    console.log(url);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data);
        console.log(data);
        return data;
      });
  }, []);

  return (
    <Card>
      <h1>This is the list of cans</h1>
      <NewCanForm />
      {DUMMY_CANS.map((can) => (
        <Can item={can.item} quantity={can.quantity} />
      ))}
    </Card>
  );
};

export default Cans;
