function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomFloat(min: number, max: number, decimals = 1) {
  const factor = Math.pow(10, decimals);
  return Math.round((Math.random() * (max - min) + min) * factor) / factor;
}

function parseSample(sample: string) {
  const hasDecimal = /\d+\.\d+/.test(sample);
  const ops = sample.split(/[\d.]+/).filter(Boolean);
  const nums = sample.match(/[\d.]+/g)?.map(Number) || [];
  return { hasDecimal, ops, nums };
}

export function generateProblems(samples: string[], count: number, opsList?: (string[] | string)[]) {
  // Analyze samples for types of operations and number types
  const parsed = samples.map(parseSample);

  // Gather operations and detect decimals
  const allOps = Array.from(new Set(parsed.flatMap(p => p.ops)));
  const usesDecimal = parsed.some(p => p.hasDecimal);

  // Partition allOps into addSubOps and mulDivOps
  const addSubOps = allOps.filter(op => op === "+" || op === "-");
  const mulDivOps = allOps.filter(op => op === "*" || op === "/");

  // Guess number of operands: median of sample sizes
  const numOperands = Math.round(
    parsed.reduce((acc, p) => acc + p.nums.length, 0) / parsed.length
  );

  let problems: string[] = [];
  let answers: number[] = [];
  for (let i = 0; i < count; ++i) {
    let ops: string[] = [];
    let nums: number[] = [];
    // Enforce: do not mix +,- with * or /
    if (opsList && opsList[i] && Array.isArray(opsList[i])) {
      const opSet = new Set(opsList[i] as string[]);
      const hasAddSub = opSet.has("+") || opSet.has("-");
      const hasMulDiv = opSet.has("*") || opSet.has("/");
      if (hasAddSub && hasMulDiv) {
        throw new Error("Cannot mix addition/subtraction with multiplication/division in a single problem");
      }
    }
    for (let j = 0; j < numOperands; ++j) {
      if (usesDecimal) {
        nums.push(randomFloat(0, 999, 1));
      } else {
        nums.push(randomInt(0, 999));
      }
      if (j < numOperands - 1) {
        if (opsList && opsList[i]) {
          // Support both string (single op) and string[] (multiple ops)
          if (Array.isArray(opsList[i])) {
            ops.push((opsList[i] as string[])[j] || allOps[randomInt(0, allOps.length - 1)]);
          } else {
            ops.push(opsList[i] as string);
          }
        } else {
          // If not specified, pick a group for this problem and stick to it
          let opGroup;
          if (addSubOps.length && mulDivOps.length) {
            // Randomly pick group for this problem
            opGroup = Math.random() < 0.5 ? addSubOps : mulDivOps;
          } else if (addSubOps.length) {
            opGroup = addSubOps;
          } else {
            opGroup = mulDivOps;
          }
          ops.push(opGroup[randomInt(0, opGroup.length - 1)]);
        }
      }
    }
    const problem = nums.map((n, idx) =>
      idx < ops.length ? `${n}${ops[idx]}` : `${n}`
    ).join("");
    let answer = nums[0];
    let negativeResult = false;
    for (let j = 1; j < nums.length; ++j) {
      switch (ops[j - 1]) {
        case "+": answer += nums[j]; break;
        case "-": answer -= nums[j]; break;
        case "*": answer *= nums[j]; break;
        case "/": answer /= nums[j]; break;
        default: break;
      }
      if (answer < 0) negativeResult = true;
    }
    if (negativeResult) {
      i--; // retry this problem
      continue;
    }
    problems.push(problem);
    answers.push(Number(answer.toFixed(3)));
  }
  return { problems, answers };
}