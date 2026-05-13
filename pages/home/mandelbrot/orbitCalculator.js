import BigNumber from "https://cdn.jsdelivr.net/npm/bignumber.js@latest/+esm"

export { getIterations }

const decimals = 100;
const max = new BigNumber("1e100");

function getIterations(center, numIterations) {
  let z = [new BigNumber(0), new BigNumber(0)];
  let iterations = [[center[0].toNumber(), center[1].toNumber()]];
  for (let a = 0; a < numIterations; a++) {
    const r = z[0];
    const i = z[1];
    //if (r.multipliedBy(r).plus(i.multipliedBy(i)).gt(9)) return iterations;

    z = [clampNumber(r.multipliedBy(r).minus(i.multipliedBy(i)).plus(center[0])), clampNumber(r.multipliedBy(i).multipliedBy(2).plus(center[1]).decimalPlaces(decimals))];

    iterations.push([z[0].toNumber(), z[1].toNumber()]);
  } 

  return iterations;
}

function clampNumber(x) {
  if (x.abs().gt(max)) {
    return x.isNegative() ? max.negated() : max;
  }

  return x.decimalPlaces(decimals);
}