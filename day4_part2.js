/*

--- Part Two ---
The line is moving more quickly now, but you overhear airport security talking about how passports with invalid data are getting through. Better add some data validation, quick!

You can continue to ignore the cid field, but each other field has strict rules about what values are valid for automatic validation:

byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
If cm, the number must be at least 150 and at most 193.
If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.
Your job is to count the passports where all required fields are both present and valid according to the above rules. Here are some example values:

byr valid:   2002
byr invalid: 2003

hgt valid:   60in
hgt valid:   190cm
hgt invalid: 190in
hgt invalid: 190

hcl valid:   #123abc
hcl invalid: #123abz
hcl invalid: 123abc

ecl valid:   brn
ecl invalid: wat

pid valid:   000000001
pid invalid: 0123456789
Here are some invalid passports:

eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007
Here are some valid passports:

pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719
Count the number of valid passports - those that have all required fields and valid values. Continue to treat cid as optional. In your batch file, how many passports are valid?

*/

const fs = require("fs");
const readline = require('readline');
const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];
let obj = {};
let numValidPassports = 0;

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

readInterface.on('line', function(line) {
  if(line === ''){
      if(validatePassport(obj)){
        numValidPassports++;
      }
      obj = {};
    }
    else {
      let fields = line.split(' ');
      fields.forEach(field =>{
        if(field !== ''){
          let splitField = field.split(':');
          let id = splitField[0];
          let value = splitField[1];
          obj[id] = value;
        }
      });
    }
});

readInterface.on('close', function() {
  // gotta get the last obj in the file
 if(validatePassport(obj)){
   numValidPassports++;
 }

 console.log(numValidPassports);
});


function validatePassport(passport){
  for(let i = 0; i < requiredFields.length; i++){
    if(!Reflect.has(passport, requiredFields[i])){
      if(requiredFields[i] !== 'cid'){
        return false
      }
    }
    else{
      switch(requiredFields[i]){
        case 'byr':
          if(!validateYear(passport['byr'], 1920, 2002)){
            console.log('invalid byr');
            return false;
          }
        break;
        case 'iyr':
          if(!validateYear(passport['iyr'], 2010, 2020)){
            console.log('invalid iyr');
            return false;
          }
          break;
        case 'eyr':
          if(!validateYear(passport['eyr'], 2020, 2030)){
            console.log('invalid eyr');
            return false;
          }
          break;
        case 'hgt':
          if(!validateHeight(passport['hgt'])){
            console.log('invalid hgt');
            return false;
          }
          break;
        case 'hcl':
          if(!validateHairColor(passport['hcl'])){
            console.log('invalid hcl');
            return false;
          }
          break;
        case 'ecl':
          if(!validateEyeColor(passport['ecl'])){
            console.log('invalid ecl');
            return false;
          }
          break;
        case 'pid':
          if(!validatePassportID(passport['pid'])){
            console.log('invalid pid');
            return false;
          }
         break;
      }
    }
  }
  return true;
}

function validateYear(input, minYear, maxYear){
  let integer = parseInt(input);
  if(integer !== NaN){
    return integer >= minYear && integer <= maxYear;
  }
  return false;
}

function validateHeight(input){
  let regex = new RegExp("(.+)(cm|in)", 'g');
  let match = regex.exec(input);
  if(match === null){
    return false;
  }

  let num = match[1];
  let metric = match[2];
  switch(metric) {
    case 'cm':
      if(num >= 150 && num <= 193){
        return true;
      } 
    break;
    case 'in':
      if(num >= 59 && num <= 76){
        return true;
      }
    break;
  }
  return false;
}

function validateHairColor(input){
  let regex = new RegExp("#([0-9]|[a-f]){6}");
  return regex.test(input);
}

function validateEyeColor(input){
  let regex = new RegExp("amb|blu|brn|gry|grn|hzl|oth");
  return regex.test(input);
}

function validatePassportID(input){
  let regex = new RegExp("^[0-9]{9}$");
  return regex.test(input);
}

