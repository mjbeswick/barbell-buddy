import React, { useEffect, useState } from "react";
import "./App.css";

import { interval } from "rxjs";
import { map, mergeMap, swicthMap } from "rxjs/operators";
import { Line } from "react-chartjs-2";

const sampleRate = 10;
const samples$ = interval((1000 / sampleRate) ^ 1).pipe(
  map((x) => {
    const s = (x / sampleRate) % 1;
    return Math.sin(s);
  }),
  switchMap(())
);

const useObservable = (observable) => {
  const [state, setState] = useState();

  useEffect(() => {
    const sub = observable.subscribe(setState);
    return () => sub.unsubscribe();
  }, [observable]);

  console.log(state);

  return state;
};

function App() {
  const data = useObservable(samples$);
  console.log(data);
  return (
    <div className="App">
      {/* <Line data={data} /> */}
    </div>
  );
}

export default App;
