const marvel_heros = ["thor", "ironmen"]
const dc = ["superman", "flash"]
marvel_heros.push(dc);
console.log(marvel_heros)
//['thor','ironmen',['superman','flash']]
const all = marvel_heros.concat(dc)
console.log(all);
//naaya array ayega jisme combined ayega 
const all_new_heroes = [...marvel_heros, ...dc]
console.log(all_new_heroes);
//ye jod deta hai but do se jada ko bhi jod skte hai islye ye use krt
const another_array = [1, 2, 3, [4, 5, 6], 7, [6, 7, [4, 5]]]
const real_array = another_array.flat(Infinity)
console.log(real_array);
//[1,2,3,4,5,6,7,6,7,4,5]
console.log(Array.isArray("Hitesh"));
//false
console.log(Array.from("Hitesh"));
//['H','i','t','e','s','h']
console.log(Array.from({ name: "Hitesh" }));
//give as [] empty array , interesting 
let score1 = 100
let scroe2 = 200;
let score3 = 300
console.log(Array.of(score1, score2, score3));
//[100,200,300]


