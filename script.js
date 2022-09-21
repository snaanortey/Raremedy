console.log("hey");

// Create 31 instances of option element for each day of the month and append to select element
const createDaysEl = () => {
  const parentEl = document.getElementById("day-input");
  parentEl.innerHTML = "";
  const dayEl = document.createElement("option");
  dayEl.value = "";
  for (let i = 1; i <= 31; i++) {
    const dayEl = document.createElement("option");
    dayEl.value = i;
    dayEl.innerText = i;
    parentEl.appendChild(dayEl);
  }
};

// Create 12 instances of option element for each month of the year and append to select element
const createMonthsEl = () => {
  const parentMonthEl = document.getElementById("month-input");
  parentMonthEl.innerHTML = "";
  for (let i = 0; i <= 11; i++) {
    const dateObj = new Date(2020, i);
    const dateMonth = dateObj.toLocaleDateString("en-US", {
      month: "long",
    });
    const monthEl = document.createElement("option");
    monthEl.value = dateMonth;
    monthEl.innerText = dateMonth;
    parentMonthEl.appendChild(monthEl);
  }
};
createDaysEl();

createMonthsEl();

//Save user's name in browser's local storage

function handleFormSubmit() {
  let inputValue = document.getElementById("first-name").value;
  localStorage.setItem("username", inputValue);

  //Save birth day in browser's local storage

  let inputValueOne = document.getElementById("day-input").value;
  localStorage.setItem("dayOfBirth", inputValueOne);

  //save birth month in browser's local storage

  let inputValueTwo = document.getElementById("month-input").value;
  localStorage.setItem("monthOfBirth", inputValueTwo);

  window.location = "./dashboard.html";
}

//Register submit event listener
const button = document.getElementById("submit-button");
button.addEventListener("click", handleFormSubmit);
