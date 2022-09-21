// Retrieve data stored in local storage
const userName = localStorage.getItem("username");
const dayOfBirth = localStorage.getItem("dayOfBirth");
const monthOfBirth = localStorage.getItem("monthOfBirth");

console.log(userName, dayOfBirth, monthOfBirth);

function displayUserDetails() {
  const firstNameEl = document.getElementById("first-name");
  firstNameEl.innerText = `Welcome ${userName}`;
}

// Function that gets name meaning and origin api and displays on dashboard
function displayNameMeaning() {
  const options = {
    method: "GET",
    url: "https://name-meanings.p.rapidapi.com/getnamedata",
    params: { name: userName },
    headers: {
      "X-RapidAPI-Key": "ad9580bfa8msh7e9a52e0772d196p1036bbjsn8184ad81a005",
      "X-RapidAPI-Host": "name-meanings.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      const nameMeaning = response.data.nameData.meaning;
      const nameOrigin = response.data.nameData.origin;
      const nameMeaningEL = document.getElementById("nameMeaning");
      nameMeaningEL.innerText = `${userName}, your name means ${nameMeaning} and originates from ${nameOrigin}`;
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

// functions that gets a history event on user's birthday and month

function dobRelatedHistory() {
  const options = {
    method: "POST",
    url: "https://history-events-of-a-day.p.rapidapi.com/api/getevents",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "ad9580bfa8msh7e9a52e0772d196p1036bbjsn8184ad81a005",
      "X-RapidAPI-Host": "history-events-of-a-day.p.rapidapi.com",
    },
    data: JSON.stringify({
      day: dayOfBirth,
      month: monthOfBirth.toLowerCase(),
    }),
  };

  axios
    .request(options)
    .then(function (response) {
      const historyItems = response.data.data.slice(0, 2);
      for (const historyItem of historyItems) {
        // Create li item in DOM
        const liEl = document.createElement("li");
        liEl.innerText = historyItem.event;
        // Set the innertext to historyItem property
        document.getElementById("dobHistory").appendChild(liEl);
      }
      console.log(historyItems);
    })
    .catch(function (error) {
      console.error(error);
    });
}

// Functions generates random jokes from a jokes API

function generateJokes() {
  const options = {
    method: "GET",
    url: "https://joke-generator.p.rapidapi.com/generate-joke",
    headers: {
      "X-RapidAPI-Key": "ad9580bfa8msh7e9a52e0772d196p1036bbjsn8184ad81a005",
      "X-RapidAPI-Host": "joke-generator.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      const jokesEl = document.getElementById("jokes");

      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function getAndDisplayJoke() {
  const options = {
    method: "GET",
    url: "https://joke-generator.p.rapidapi.com/generate-joke",
    headers: {
      "X-RapidAPI-Key": "ad9580bfa8msh7e9a52e0772d196p1036bbjsn8184ad81a005",
      "X-RapidAPI-Host": "joke-generator.p.rapidapi.com",
    },
  };

  // call api to get joke
  axios
    .request(options)
    .then(function (response) {
      // take the joke and insert it into the joke container
      document.getElementById("jokeTitle").innerText = response.data.title;
      document.getElementById("jokeContainer").innerText =
        response.data.content;
    })
    .catch(function (error) {
      // handle failure of joke api response
      document.getElementById(
        "jokeContainer"
      ).innerText = `Joke load failed ${error.message}`;
    });
}

function startup() {
  displayUserDetails();

  displayNameMeaning();
  // dobRelatedHistory();

  // call other startup tasks

  // register modal handler for each modal
  // fetch the first joke when the modal is shown
  const sadModal = document.getElementById("sadModal");
  sadModal.addEventListener("shown.bs.modal", getAndDisplayJoke);

  // fetch a new joke when the button is clicked
  const getAnotherJokeButton = document.getElementById("showAnotherJoke");
  getAnotherJokeButton.addEventListener("click", getAndDisplayJoke);
}

startup();
