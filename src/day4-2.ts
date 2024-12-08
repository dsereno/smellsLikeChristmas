import fs from 'fs';
import readline from 'readline';

function neighboursHasXmas(matrix: Array<string>, x: number, y:number): boolean {
    const valA = matrix[x-1][y-1];
    const valB = matrix[x-1][y+1];
    const valC = matrix[x+1][y-1];
    const valD = matrix[x+1][y+1];

    if(valA === 'M' && valB === 'M' && valC === 'S' && valD === 'S'){return true};
    if(valA === 'S' && valB === 'S' && valC === 'M' && valD === 'M'){return true};
    if(valA === 'S' && valB === 'M' && valC === 'S' && valD === 'M'){return true};
    if(valA === 'M' && valB === 'S' && valC === 'M' && valD === 'S'){return true};
    return false;
}

async function processFile(filePath: string) {
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Recognize all line break types (Windows, Unix)
  });

  const matrix = [];
  for await (const line of rl) {
    matrix.push(line);
  }

let count = 0;

  for (let x = 1; x < matrix.length -1; x++) {
    for (let y = 1; y < matrix[0].length - 1; y++) {
        const element = matrix[x][y];
        if(element === 'A' && neighboursHasXmas(matrix,x,y)) {
            count ++
        };
    }
  }


  console.log('FINAL RESULT: '+count)
}

processFile('./src/resources/day4/part1data.txt').catch((err) => console.error('Error:', err));