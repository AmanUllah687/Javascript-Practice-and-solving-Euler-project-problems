const URL = "https://official-joke-api.appspot.com/random_joke";
const jokePara = document.querySelector("#joke")
const getJokes = async () => {
  console.log("getting data .....");
  let response = await fetch(URL);
  console.log(response); // Json Format 
  let data = await response.json();
  jokePara.innerText = `${data.setup} ... ${data.punchline}`;

}
