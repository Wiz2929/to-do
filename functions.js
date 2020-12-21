function setItem(name,value){
  if(name.length < 1 || value.length < 1 || name == undefined || value == undefined || name == null || value == null){
    console.log("error Falied To SetItem || Input proper name and value");
    return ;
  }
  localStorage.setItem(name,JSON.stringify(value));
}
function getItem(name,value){
  if(name.length < 1 || value.length < 1 || name == undefined || value == undefined || name == null || value == null){
    console.log("error Falied To GetItem || Input proper name and value");
    return ;
  }
  return JSON.parse(localStorage.getItem(name,value));
}