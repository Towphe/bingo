let Alpine = window["Alpine"];

// console.log(alpine.Alpine);

// function that adds a mark to a number element
const markNumber = (numberButton) => {
  // set text-color to red
  numberButton.style.color = "red";
};

// function that removes a mark from a number element
const unmarkNumber = (numberButton) => {
  // set text-color to black
  numberButton.style.color = "#333333";
};

// function that toggles/untoggles a number
const toggleNumber = (numberButton) => {
  if (numberButton.tagName !== "BUTTON")
    throw new Error("Invalid element type. It should be a `button`.");

  // check if number is already toggled
  if (numberButton["dataset"]["toggled"] === "true") {
    // untoggle / remove mark
    unmarkNumber(numberButton);
  } else {
    // mark as toggled
    markNumber(numberButton);
  }

  // negate toggle
  numberButton["dataset"]["toggled"] =
    numberButton["dataset"]["toggled"] == "true" ? "false" : "true";
};

// function that generates a valid bingo card
const generateNumbers = () => {
  let numbers = [];
  // iterate to every cell
  for (let i = 0; i < 5; i++) {
    let temp = [];
    for (let j = 0; j < 5; j++) {
      // generate num
      let num = (1 + j) * 15 - Math.floor(Math.random() * 15);

      // check if num already exists
      const flattenedNumbers = numbers.flat();
      while (flattenedNumbers.indexOf(num) > -1) {
        num = (1 + j) * 15 - Math.floor(Math.random() * 15);
      }

      temp.push(num);
    }
    // push temp array to main array
    numbers.push(temp);
  }

  // return flattened numbers
  return numbers.flat();
};

const retrieveNumbers = () => {
  // retrieve numbers from local storage
  let nums = localStorage.getItem("numbers");

  // check if there are nums stored in local storage
  if (nums === null) {
    // data = reactive({ nums: generateNumbers() });
    nums = generateNumbers();
    localStorage.setItem("numbers", nums);
  } else {
    // treat retrieved nums
    nums = JSON.parse(`[${nums}]`);
  }

  return nums;
};

// function that creates a new bingo card
const generateNewCard = () => {
  const nums = generateNumbers();

  localStorage.setItem("numbers", nums);

  return nums;
};
