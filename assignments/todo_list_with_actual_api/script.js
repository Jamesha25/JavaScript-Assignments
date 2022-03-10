let arr = []
let statusFilter=[]
let workInput=document.getElementById("work-input")
let statusInput=document.getElementById("status-input")
let todoList=document.getElementById("todoList")
let error=document.getElementById("error")
let completed=document.getElementById("completed")
let pending=document.getElementById("pending")


const fetchData = async ()=>{
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/todos')
        let data = await response.json()
        data.map((item)=>{
            arr.push({completed:item.completed,title:item.title})
        })
        displayTodos(arr);
    } catch (error) {
        console.log(error)
    }
}
fetchData();



const handleSubmit=(e)=>{
    e.preventDefault()
    let workItem={
        completed : statusInput.value, 
        title : workInput.value,
    }
    const exist=(workObj)=>{
        return workObj.title===workItem.title
    }
    let alreadyExist=arr.some(exist)


    if(workItem.title === "" || workItem.completed=== ""){ 
        error.innerHTML="Kindly Fill All the Details before Submitting"
    }
    else if(alreadyExist){
        error.innerHTML="item is already present in the list"
    }
    else{
        arr.unshift(workItem)
        error.innerHTML="Work added to the List"
        workInput.value=""
        statusInput.value=""
        console.log(arr[arr.length-1])
        displayTodos(arr);
    }
}

const displayTodos = (arr) => {
    const htmlString = arr
        .map((item,ind) => {
            return `
            <div key=${ind} onclick="removeItem(${ind})" class='work-container'>
                <span class='status-container'>
                    <span class='sideHeading'>Status:</span>
                    <span name='status'>${item.completed}</span>
                </span> 
                <span>
                    <span class='sideHeading'>Work:</span>
                    <span>${item.title}</span>
                </span>
                <span>
                    <span class='remove'>Click To Remove</span>
                </span>
            </div>
        `;
        })
        .join('');
    todoList.innerHTML = htmlString;
    changeStatusColor(arr);
};

const changeStatusColor=(arr)=>{
    let status=document.getElementsByName('status')
    // console.log(status[0])
    arr.map((item,ind) => {
        if(item.completed===true || item.completed==='true'){
            status[ind].classList.add("success")
        }else{
            status[ind].classList.add("failure")
        }
    })
}

const removeItem=(i)=>{
    error.innerHTML=""
    arr.splice(i,1)
    console.log(arr[arr.length-1])
    displayTodos(arr)
}

document.onkeydown=function(){
    if(window.event.keyCode=='13'){
        handleSubmit();
    }
}

const clearErrMessege=()=>{
    if(error.innerHTML!==""){
        error.innerHTML=""
    }
}
const handleStatusFilter=(option)=>{
    const index = statusFilter.indexOf(option); 
    if(index >= 0){                           
        statusFilter.splice(index,1);             
    }
    else{
        statusFilter.push(option); 
    } 
    console.log(statusFilter)
    if(statusFilter.length>0)
        handlefilterprocess(statusFilter)
    else
        displayTodos(arr)
}
const handlefilterprocess=(checkedboxes)=>{
    let isCompletedChecked = checkedboxes.includes('completed')
    let isPendingChecked = checkedboxes.includes('pending')
    if(isCompletedChecked && isPendingChecked){
        displayTodos(arr)
    }
    else if(isCompletedChecked){
        const result=arr.filter((workObj)=>{return workObj.completed === true || workObj.completed === 'true'})
        displayTodos(result)
        console.log(result)
    }
    else if(isPendingChecked){
        const result=arr.filter((workObj)=>{return workObj.completed === false || workObj.completed === 'false'})
        displayTodos(result)
        console.log(result)
    }
}