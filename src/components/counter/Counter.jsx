import { useState } from "react";
import { Button } from "../ui/button";

export default function Counter({ increase, decrease }) {
  return (
    <div>
      <Button onClick={increase}>Increase</Button>
      <Button onClick={decrease}>Decrease</Button>
    </div>
  );
}
