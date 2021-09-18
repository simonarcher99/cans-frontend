import React from "react";

import Card from "../UI/Card";
import classes from "./Cans.module.css";
import Can from "./Can";

const Cans = () => {
  const DUMMY_CANS = [
    { item: "Baked Beans", id: 1, quantity: 3 },
    { item: "Scoth Broth", id: 2, quantity: 5 },
    { item: "Chopped Tomatoes", id: 3, quantity: 2 },
    { item: "Chicked Peas", id: 4, quantity: 2 },
    { item: "Black Beans", id: 5, quantity: 2 },
  ];

  return (
    <Card>
      <h1>This is the list of cans</h1>
      {DUMMY_CANS.map((can) => (
        <Can item={can.item} quantity={can.quantity} />
      ))}
    </Card>
  );
};

export default Cans;
