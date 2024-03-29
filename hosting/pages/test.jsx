import { useBearStore } from "../context/authState";

function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  return <h1>{bears} around here ...</h1>;
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>one up</button>;
}

export default function StateTest() {
  return (
    <>
      <BearCounter />
      <Controls />
    </>
  );
}
