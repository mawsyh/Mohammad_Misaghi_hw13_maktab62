const fs = require("fs");
const { accessPromise, readFilePromise } = require("./fsPromiseModules");

Promise.all([accessPromise("names.txt"), accessPromise("numbers.txt")])
  .then(() => {
    return Promise.all([
      readFilePromise("names.txt"),
      readFilePromise("numbers.txt"),
    ]);
  })
  .then(userObjectMaker)
  .catch((err) => {
    console.log(err);
  });

function userObjectMaker([names, numbers]) {
  let person = {};
  let peopleNames = names.split("\n");
  for (const element of peopleNames) {
    [key, value] = element.split(" - ");
    person[key] = value;
  }
  let phones = {};
  let peopleNumbers = numbers.split("\n");
  for (const el of peopleNumbers) {
    [key, value] = el.split(" - ");
    if (phones[key]) {
      phones[key] = [...phones[key], value];
    } else {
      phones[key] = [value];
    }
  }
  formatter(person, phones);
}

function formatter(person, phones) {
  let result = "";
  for (let key in person) {
    switch (phones[key]?.length) {
      case undefined:
        result += `${person[key]} has't any phone number.`;
        break;
      case 1:
        result += `${person[key]} phone number is ${phones[key][0]}.\n`;
        break;
      default:
        result += `${person[key]} phone numbers are ${phones[key]}.\n`;
        break;
    }
  }

  console.log(result);
}
