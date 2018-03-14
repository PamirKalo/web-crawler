const testArr = [
    ['Kia Ceed 1.4i', '16,990 лв', '2015 год', 'cars.bg'],
    ['Kia Ceed 1,4', '6,200 лв', '2008 год', 'cars.bg'],
    ['Kia Ceed 1.6 CRDI 16V', '9,400 лв', '2008 год', 'cars.bg'],
    ['Kia Ceed 1.6D Автомат', '9,800 лв', '2010 год', 'cars.bg'],
];

const price = Number(testArr[1][1].match(/\d+/g).join(''));
console.log(price);
const year = Number(testArr[1][2].split(' ')[0]);
console.log(year);


