import fs from 'fs';
import readline from 'readline';

// M -> U -> L -> ( -> n* Digit -> , n* Digit -> )
enum State {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
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

while(count < bigString.length){
    const letter = bigString[count];
    switch (state) {
        case State.Step1:
            if(letter === 'm') {
                state = State.Step2;
            }
        break;
        case State.Step2:
            if(letter === 'u') {
                state = State.Step3;
            } else {
                reset();
            }
        break;
        case State.Step3:
            if(letter === 'l') {
                state = State.Step4;
            } else {
                reset();
            }
        break;
        case State.Step4:
            if(letter === '(') {
                state = State.Step5;
            } else {
                reset();
            }
        break;
        case State.Step5:
            if(isNumber(letter)) {
                number1 += letter;
            } else if(letter === ',' && number1.length > 0) {
                state = State.Step6;
            }  else {
                reset();
            }
        break;
        case State.Step6:
            if(isNumber(letter)) { 
                number2 += letter;
            } else if(letter === ')' && number2.length > 0) {
                //update total
                total += Number.parseInt(number1) * Number.parseInt(number2) 
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