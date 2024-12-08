import fs from 'fs';
import readline from 'readline';

// M -> U -> L -> ( -> n* Digit -> , n* Digit -> )
enum State {
    Step1,
    Step2,
    Step3,
}

function isNumber(val: string): boolean {
    return val === '0' ||  val === '1'|| val === '2' || val === '3' || val === '4' || val === '5' || val === '6' || val === '7' || val === '8'|| val === '9'  
}

async function processFile(filePath: string) {
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Recognize all line break types (Windows, Unix)
  });

  let bigString = '';

  for await (const line of rl) {
    bigString += line;
  }

let count = 0;
let state: State = State.Step1;

let number1 = '';
let number2 = '';

let total = 0;

const reset = () => {
    number1 = '';
    number2 = '';
    state = State.Step1;
}

let toggle = true;

while(count < bigString.length){
    const letter = bigString[count];
    switch (state) {
        case State.Step1:
                //Check if don't and skip those steps
                if(bigString.substring(count, count+ 5) === "don't") {
                    toggle = false;
                    count += 5;
                    continue;
                }else if( bigString.substring(count, count+ 2) === "do"){
                    toggle = true;
                    count += 2;
                    continue;
                }else if(bigString.substring(count, count+ 4) === 'mul(') {
                    state = State.Step2;
                    count += 4;
                    continue;
                }
        break;
        case State.Step2:
            if(isNumber(letter)) {
                number1 += letter;
            } else if(letter === ',' && number1.length > 0) {
                state = State.Step3;
            }  else {
                reset();
            }
        break;
        case State.Step3:
            if(isNumber(letter)) { 
                number2 += letter;
            } else if(letter === ')' && number2.length > 0) {
                if(toggle) total += Number.parseInt(number1) * Number.parseInt(number2) 
                reset();
            }  else {
                reset();
            }
        break;
    }

    count++;
}


  console.log('The answer is '+total);
}

processFile('./src/resources/day3/data.txt').catch((err) => console.error('Error:', err));