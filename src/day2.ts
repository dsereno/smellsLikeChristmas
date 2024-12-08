import fs from 'fs';
import readline from 'readline';

async function processFile(filePath: string) {
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Recognize all line break types (Windows, Unix)
  });

let valid = 0;

  for await (const line of rl) {
    let isValid = true;
    const nums = line.split(' ');
    let diff = Number.parseInt(nums[0]) - Number.parseInt(nums[1]);

    console.log(line);

    if(Math.abs(diff) === 0 || Math.abs(diff) > 3 ) 
        {
            console.log('first element diff error')
            continue;
        }

    let isGrowing = diff < 0;
    for (let index = 1; index < nums.length - 1; index++) {
        diff = Number.parseInt(nums[index]) - Number.parseInt(nums[index+1]);

        if(Math.abs(diff) === 0 || Math.abs(diff) > 3 ){
            isValid = false;
            console.log('Diff error')
            break;
        }
        if(diff < 0 !== isGrowing) {
            console.log('Wrong direction')
            isValid = false;
            break;
        }
    }

    if(isValid) {valid++;console.log('Nice BRO')}
  }

  console.log('Finished reading file. The answer is '+valid);
}

processFile('./src/resources/day2/part1data.txt').catch((err) => console.error('Error:', err));