//import Text from './text.js';
//console.log(Text);

let alltodos = getItem("todos");
if(alltodos == null || alltodos == undefined || alltodos.length < 1){
  let data = [{id:0,value:"Add New ToDo",checked:false}];
  setItem("todos",data);
  //return null;
}
function listTodos(alltodos){
$("#todos").empty();
alltodos.forEach( todo => {
  
  if(todo.checked){
    $("#todos").append('<li class="list-group-item hover-shadow"><input class="form-check-input me-1 ml-3" type="checkbox" onclick="checkTodo(this)" todoid="'+todo.id+'" value="" aria-label="..." checked /> <span class="ml-3" ><s>'+todo.value+'</s></span><button todoid="'+todo.id+'" class="btn btn-warning btn-sm" style="position: absolute; right: 15px;top: auto;bottom: auto;" onclick="removeTodo(this)" ><i class="far fa-trash-alt fa-lg"></i></button></li>')
  }else{
$("#todos").append('<li class="list-group-item hover-shadow" ><input class="form-check-input me-1 ml-3" type="checkbox" onclick="checkTodo(this)" todoid="'+todo.id+'" value="" aria-label="..." /> <span class="ml-3" >'+todo.value+'</span><button todoid="'+todo.id+'" class="btn btn-warning btn-sm" style="position: absolute; right: 15px;top: auto;bottom: auto;" onclick="removeTodo(this)" ><i class="far fa-trash-alt fa-lg"></i></button></li>')
}
  })
}
listTodos(getItem("todos"));

function addNewTodo(){
 //console.log($("#addtodo").val())
 if($("#addtodo").val().length < 3){
   $("#warning-note").html("<strong>Error</strong><br />Todo Value Length Should Be Above 3 Characters");
   $("#warning-note-c").toggle();
   //alert("Todo Value Length Should Be Above 3 Characters");
   return null;
 }
 let data = getItem("todos");
 data.push({id:data[data.length-1].id+1,value:$("#addtodo").val(),checked:false});
 if(data[0].id == 0){
   data.splice(0,1);
 }
 setItem("todos",data);
 listTodos(getItem("todos"));
 $("#addtodo").val("");
}

function checkTodo(el){
  
 let data = getItem("todos");
 data.forEach( todo => {
   if(todo.id == $(el).attr("todoid")){
     if(todo.checked){
     todo.checked = false ;
     }else{
       todo.checked = true;
     }
   }
 })
 setItem("todos",data);
 listTodos(getItem("todos"));
}

function hideWarningNote(){
  $("#warning-note-c").toggle();
}

function removeTodo(el){
  let data = getItem("todos");
 data.forEach( todo => {
   if(todo.id == $(el).attr("todoid")){
     data.splice(data.indexOf(todo),1);
   }
 })
 if(data.length < 1){
   data = [{id:0,value:"Add New ToDo",checked:false}];
 }
 setItem("todos",data);
 listTodos(getItem("todos"));
}
function move(array, from, to) {
  if(to > from){
  to = to - 1 ;
  } 
  if( to === from ) return array;

  var target = array[from];                         
  var increment = to < from ? -1 : 1;

  for(var k = from; k != to; k += increment){
    array[k] = array[k + increment];
  }
  array[to] = target;
  return array;
}
dragula([document.getElementById('todos')],{direction: 'vertical',
  copy: false,
  copySortSource: false, 
  revertOnSpill: false,
  mirrorContainer: document.getElementById("warning-note"), 
}).on('drop', function (el, target, source, sibling) {
   
  // console.log($(el).next().children().first().attr("todoid"));
   let todos = getItem("todos");
   let fromIndex = 0;
   let toIndex = 00 ;
   if($(el).next().children().first().attr("todoid") == undefined){
     return null;
   }
   todos.forEach ( todo => {
     if(todo.id == $(el).children().first().attr("todoid")){
       //console.log(todo)
       fromIndex = todos.indexOf(todo)
     }
     if(todo.id == $(el).next().children().first().attr("todoid")){
       //console.log(todo)
       toIndex = todos.indexOf(todo);
     }
   })
   move(todos,fromIndex,toIndex);
   setItem("todos",todos);
   listTodos(getItem("todos"))
  })