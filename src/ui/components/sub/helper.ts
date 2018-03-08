export default function sub([val, amount]: [number, number]) {
  let result = val - amount;

  if (isNaN(result)) {
    debugger;
  }

  return result;
}
