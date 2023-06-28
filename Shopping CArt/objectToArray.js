//change to array::
let scrimbaUsers = {
 "00": "sindre@scrimba.com",
 "01": "per@scrimba.com",
 "02": "frode@scrimba.com"
} 

console.log(Object.entries(scrimbaUsers));//vypise mi cely objekt na array

//Object.entries()mi premeni cokolvek co chcem na array



console.log(Object.keys(scrimbaUsers))//vypise mi keys hodnoty. Cize ID mojich pouzivatelov "00", "01"...

console.log(Object.values(scrimbaUsers))//vypise mi honoty ktore nadobudaju keys. Cize moje emaily: "sindre@scrimba.com"...