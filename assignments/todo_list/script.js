let arr = []
let inputBox=document.getElementById("input-box")
let todoList=document.getElementById("todoList")
let error=document.getElementById("error")




const handleSubmit=()=>{
    let todoItem=inputBox.value;
    let alreadyExist=arr.includes(todoItem);
    if(todoItem === ""){
        error.innerHTML="please fill the box before submitting"
    }
    else if(alreadyExist){
        error.innerHTML="item is already present in the list"
    }
    else{
        error.innerHTML=""
        arr.push(todoItem)
        inputBox.value=""
        displayTodos(arr);
    }
    
}

const displayTodos = (arr) => {
    const htmlString = arr
        .map((item,ind) => {
            return `
            <p key=${ind} onclick="removeItem(${ind})">${item}</p>
        `;
        })
        .join('');
    todoList.innerHTML = htmlString;
};

const removeItem=(i)=>{
    error.innerHTML=""
    arr.splice(i,1)
    displayTodos(arr)
}

document.onkeydown=function(){
    if(window.event.keyCode=='13'){
        handleSubmit();
    }
}