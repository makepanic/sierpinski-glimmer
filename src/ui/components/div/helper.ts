export default function div([val, divisor]: [number, number]) {
  const result = val / divisor;

  if (isNaN(result)) {
    debugger;
  }

  return result;
}
