import fs from 'fs';
import readline from 'readline';



function howManyInSlice(slice: string): number {
    const word = 'XMAS';
    let count = 0;
    for (let i = 0; i < slice.length; i++) {
        //NORMAL DIRECTION
        if(i + word.length <= slice.length) {
            let hasNormalDirection = true;
            for (let index = 0; index < word.length; index++) {
                if(word[index] !== slice[i + index]) {
                    hasNormalDirection = false;
                    break;
                }
            }
            if(hasNormalDirection) count++;
        }

        //REVERSE DIRECTION
        if(i - word.length + 1 >= 0) {
            let hasReverseDirection = true;
            for (let index = 0; index < word.length; index++) {
                if(word[index] !== slice[i - index]) {
                    hasReverseDirection = false;
                    break;
                }
            }
            if(hasReverseDirection) count++;
        }   
    }
 
    return count;
}

function getDiagonalSliceLeftToRight(matrix: Array<string>, x: number , y:number ): string{
    let result = '';
    let hor = x;
    let ver = y;

    while(true) {
        if(hor == matrix[0].length || ver == matrix.length ){
            break
        }
        result += matrix[hor][ver];
        hor++;
        ver++;
    }
    return result;
}

function getDiagonalSliceRightToLeft(matrix: Array<string>, x: number , y:number ): string{
    let result = '';
    let hor = x;
    let ver = y;

    while(true) {
        if(hor == matrix[0].length|| ver ==  -1 ){
            break
        }
        result += matrix[hor][ver];
        hor++;
        ver--;
    }
    return result;
}

function getVerticalSlices(matrix: Array<string>) {
    const result: Array<string> = [];

    for (let i = 0; i < matrix[0].length; i++) {
        result.push(matrix[0][i]);
    }

    for (let x = 1; x < matrix.length; x++) {
        for (let i = 0; i < matrix[0].length; i++) {
            result[i] += matrix[x][i]
        }
    }
    return result;
}

function getDiagonalLeftToRightSlices(matrix: Array<string>) {
    const result = [];
    result.push(getDiagonalSliceLeftToRight(matrix,0,0));

    for (let i = 1; i < matrix[0].length; i++) {
        result.push(getDiagonalSliceLeftToRight(matrix,0,i));
    }

    for (let j = 1; j < matrix.length; j++) {
        result.push(getDiagonalSliceLeftToRight(matrix,j,0));
    }
    
    return result;
}

function getDiagonalRightToLeftSlices(matrix: Array<string>) {
    const result = [];

    for (let i = 0; i < matrix[0].length; i++) {
        result.push(getDiagonalSliceRightToLeft(matrix,0,i));
    }

    for (let j = 1; j < matrix.length; j++) {
        result.push(getDiagonalSliceRightToLeft(matrix,j,matrix[0].length - 1));
    }
    
    return result;
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

for (let hor of matrix) {
    count += howManyInSlice(hor);
  }

  for (let ver of getVerticalSlices(matrix)) {
    count += howManyInSlice(ver);
  }

  for (let dig of getDiagonalLeftToRightSlices(matrix)) {
   
    count += howManyInSlice(dig);
  }

  for (let dig of getDiagonalRightToLeftSlices(matrix)) {
    count += howManyInSlice(dig);
  }

  console.log('FINAL RESULT: '+count)
}

processFile('./src/resources/day4/part1data.txt').catch((err) => console.error('Error:', err));