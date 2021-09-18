import React from "react";

import Card from "../UI/Card";
import classes from "./Cans.module.css";

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
      <div>This is the list of cans</div>
      {DUMMY_CANS.map((can) => (
        <div key={can.id}>
          Item: {can.item} Quantity: {can.quantity}
        </div>
      ))}
    </Card>
  );
};

export default Cans;
