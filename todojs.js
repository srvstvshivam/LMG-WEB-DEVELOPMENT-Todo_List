let todoItemsContainer = document.getElementById("todoItemsContainer");
let addtodobutton=document.getElementById("addtodobutton");
let savetodobutton = document.getElementById("savetodobutton");
 
function getTodoListFromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);
  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
}

let todoList = getTodoListFromLocalStorage();
let todocount = todoList.length;
 

savetodobutton.onclick = function () {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };

function todostatuschanged(checkboxid,labelid)
{
    let checkboxele=document.getElementById(checkboxid);
    let labelele=document.getElementById(labelid);
    labelele.classList.toggle('check');
}
function ondeletetodo(todoid)
{
    let todoElement=document.getElementById(todoid);
    todoItemsContainer.removeChild(todoElement);
    let deletedtodoitem=todoList.findIndex(function(eachitem)
    {
      let todoitem="todo"+eachitem.uniqueid;
      if(todoitem===todoid)
        return true;
        else
        return false;
    });
    todoList.splice(deletedtodoitem,1);
}
function createandappendtodo(todo)
{
        let checkboxid="checkboxinput"+todo.uniqueid;
        let labelid="label"+todo.uniqueid;
        let todoid="todo"+todo.uniqueid;


        let todoItemsContainer=document.getElementById("todoItemsContainer");
        let todoelement=document.createElement('li');
        todoelement.classList.add("todo-item-container","d-flex","flex-row");
        todoelement.id=todoid;
        todoItemsContainer.appendChild(todoelement);

        let inputelement=document.createElement('input');
        inputelement.type="checkbox";
        inputelement.classList.add("checkbox-input");
        inputelement.id=checkboxid;
            inputelement.onclick=function()
            {
            todostatuschanged(checkboxid,labelid);
            }


        todoelement.appendChild(inputelement);

        let labelcontainer=document.createElement('div');
        labelcontainer.classList.add("label-container","d-flex","flex-row");
        todoelement.appendChild(labelcontainer);

        let labelelement=document.createElement('label');
        labelelement.setAttribute("for",checkboxid);
        labelelement.classList.add("checkbox-label");
        labelelement.textContent=todo.text;
        labelelement.id=labelid;
        labelcontainer.appendChild(labelelement);

        let delcontainer=document.createElement("div");
        delcontainer.classList.add("delete-icon-container");
        labelcontainer.appendChild(delcontainer);

        let deleteicon=document.createElement("i");
        deleteicon.classList.add("far","fa-trash-alt","delete-icon");
        delcontainer.appendChild(deleteicon);
        deleteicon.onclick=function()
        {
            ondeletetodo(todoid);
        };
        }
        for(i of todoList){
        createandappendtodo(i);
      }
function onaddtodo()
{
    let userinput=document.getElementById("todoUserInput");
    let userinputvalue=userinput.value;
    if (userinputvalue==="")
       {alert("Enter Valid Text");
       return;}
    else{
    todocount=todocount+1;
    let Todo=
        {
            text:userinputvalue,
            uniqueid:todocount,
        };
    todoList.push(Todo);    
    createandappendtodo(Todo);
    userinput.value="";
}
}

addtodobutton.onclick=function()
{
    onaddtodo();
}