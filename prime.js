//prime number.

let num = 21;
let flag = 0;
for(let i=2; i<num; i++){
  if(num%i==0)
  flag++;   
}
if(flag>0)
console.log(`${num} is not a prime number`);

else
console.log(`${num} is  prime number`);