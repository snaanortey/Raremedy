



axios
.get("https://rapidapi.com/kevin-org-kevin-org-default/api/papajoke/")
.then((response) => {
 joke = response.data.content;
 console.log(joke);
});

//