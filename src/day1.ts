import fs from 'fs';
import readline from 'readline';

async function processFile(filePath: string) {
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Recognize all line break types (Windows, Unix)
  });

 let total = 0;

  const ListA = [];
  const ListB = [];
  for await (const line of rl) {
    const values = line.split('   ');
    ListA.push(Number.parseInt(values[0]));
    ListB.push(Number.parseInt(values[1]));
  }

  const sortedA = ListA.sort((a,b) => a-b);
  const sortedB = ListB.sort((a,b) => a-b);

for (let index = 0; index < sortedA.length; index++) {
    total += Math.abs( sortedA[index] - sortedB[index]);
}

  console.log('The answer is '+total);
}

processFile('./src/resources/day1/data.txt').catch((err) => console.error('Error:', err));