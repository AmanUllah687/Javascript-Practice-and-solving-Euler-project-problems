function countSelected(selectedObject) {
  let numberSelected = 0;
  for(let i = 0; i < selectedObject.options.length; i++) {
    if(selectedObject.options[i].selected) {
      numberSelected ++;
    }
  }
  return numberSelected;
}
  

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  const musicTypes = document.selectForm.musicTypes;
  console.log(`You have Selected ${countSelected(musicTypes)} option(s).`);
});