import fs from 'fs';
import readline from 'readline';

async function processFile(filePath: string) {
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Recognize all line break types (Windows, Unix)
  });

 let total = 0;

  const ListA = new Set<number>;
  const ListB = [];

  const count: {[value: number] : number} = {};
  for await (const line of rl) {
    const values = line.split('   ');
    ListA.add(Number.parseInt(values[0]));
    ListB.push(Number.parseInt(values[1]));
  }

    for(let number of ListA.values()) {
        count[number] = 0;
    }

for (let index = 0; index < ListB.length; index++) {
    const value = ListB[index];
    if(ListA.has(value)) {
        count[value] += 1;
    }
}

for(let number of ListA.values()) {
    total += (number * count[number]);
}

console.log('The answer is '+total);
}

processFile('./src/resources/day1/data.txt').catch((err) => console.error('Error:', err));