import { useSelector, useDispatch } from "react-redux";

import { Button } from "@mui/material";

import { increment, decrement } from "../store/slices/counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <h2 className="text-xl font-medium">Count: {count}</h2>
      <div className="flex gap-2">
        <Button variant="contained" onClick={() => dispatch(increment())}>
          +
        </Button>
        <Button variant="outlined" onClick={() => dispatch(decrement())}>
          -
        </Button>
      </div>
    </div>
  );
};

export default Counter;
