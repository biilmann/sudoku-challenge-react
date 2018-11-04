import generator from "sudoku";

/*
  Generates a sudoku in this format:

  {
    rows: [{index: 0, cols: [{value: 1, readonly: 1, row: 0, col: 0}, ...]}, ...],
    solution: [0, 1, ...],
    startTime: Date
  }
*/
export function generateSudoku() {
  const urlResult = fromUrl();
  const raw = urlResult ? urlResult.raw : generator.makepuzzle();
  const result = {
    rows: [],
    solution: generator.solvepuzzle(raw).map(number => number + 1),
    startTime: new Date(),
    solveTime: null,
    challengeFrom: urlResult && urlResult.from,
    challengeTo: urlResult && urlResult.to,
    challengeTime: urlResult
      ? Math.floor(
          (new Date(urlResult.solveTime).getTime() -
            new Date(urlResult.startTime).getTime()) /
            1000
        )
      : null
  };
  for (let i = 0; i < 9; i++) {
    const row = { index: i, cols: [] };
    for (let j = 0; j < 9; j++) {
      const value = raw[i * 9 + j];
      const hasValue = value !== null;
      row.cols[j] = {
        row: i,
        col: j,
        readonly: hasValue,
        value: hasValue ? value + 1 : null,
        valid: hasValue
      };
    }
    result.rows.push(row);
  }
  return result;
}

export function shareUrl(sudoku, from, to) {
  const raw = sudoku.rows
    .map(row => row.cols.map(col => (col.readonly ? col.value - 1 : null)))
    .flat();
  const data = btoa(
    JSON.stringify({
      startTime: sudoku.startTime,
      solveTime: sudoku.solveTime,
      raw,
      from,
      to
    })
  );

  return document.location.href.replace(/\?.+/, "") + `?sudoku=${data}`;
}

export function checkSolution(sudoku) {
  const candidate = sudoku.rows
    .map(row => row.cols.map(col => col.value))
    .flat();
  for (let i = 0; i < candidate.length; i++) {
    if (candidate[i] === null || candidate[i] !== sudoku.solution[i]) {
      return false;
    }
  }
  return true;
}

function fromUrl() {
  const match =
    document.location.search &&
    document.location.search.match(/sudoku=([^&]+)/);
  if (match) {
    try {
      return JSON.parse(atob(match[1]));
    } catch (e) {
      console.error("This share URL didn't work: %o", e);
    }
  }
  return null;
}
