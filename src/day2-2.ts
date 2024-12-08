import fs from 'fs';
import readline from 'readline';

function getDuplicateWithoutAnElement( list: string[], index:number ){
    const newArray = [];
    for (let i = 0; i < list.length; i++) {
        if(i === index) continue
        newArray.push(Number.parseInt(list[i]));
    }
    return newArray;
}

async function processFile(filePath: string) {
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Recognize all line break types (Windows, Unix)
  });

let valid = 0;

  for await (const line of rl) {

    const original = line.split(' ');

    for (let index = 0; index < original.length; index++) {
        let isValid = true;
        const nums = getDuplicateWithoutAnElement(original, index);

        let diff = nums[0] - nums[1];
        if(Math.abs(diff) === 0 || Math.abs(diff) > 3 ) 
            {
                continue;
            }
    
        let isGrowing = diff < 0;
        for (let index = 1; index < nums.length - 1; index++) {
            diff = nums[index] - nums[index+1];
    
            if(Math.abs(diff) === 0 || Math.abs(diff) > 3 ){
                isValid = false;
                break;
            }
            if(diff < 0 !== isGrowing) {
                isValid = false;
                break;
            }
        }
    
        if(isValid) {
            valid++;
            break;
        }
    }
  }

  console.log('Finished reading file. The answer is '+valid);
}

processFile('./src/resources/day2/part1data.txt').catch((err) => console.error('Error:', err));