const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.querySelector("#error");
const countValue = document.querySelector(".count-value");

//  here querySelector have fetch out the element with proper name,
//  querySelector can fetch both id & class

let taskCount = 0;
//  let the taskCount value will be zero

const displayCount = (taskCount) => {
    countValue.innerText = " "+ taskCount;
};

/*Display function will represent the task counts 
& it will represent count-value over on html page*/

const addTask = () =>{
    const taskName = newTaskInput.value.trim();
    error.style.display="none";
    if(!taskName){
        setTimeout(()=>{
            error.style.display="block";
        },200);
        return;
    }

    /*Firstly, it will take the input from newTaskInput then it will store on taskName
    error message will be not displayed until the taskName is blank over, error message will
    display till 200 milliseconds */
    

    let task = `<div class="task">
        <input type="checkbox" class="task-check">
        <span class ="taskname">${taskName}</span>
        <button class="edit"> <i class="fa-solid fa-pen-to-square"></i> </button>
        <button class="delete"> <i class="fa-solid fa-trash"></i> </button>
    </div>`;

    // task will added inside the tasks container in the mentioned format.

    tasksContainer.insertAdjacentHTML("beforeend",task);
    // insertAdjacentHTML will add the HTML code according to set position, here is before the ending of tasks container.

    /* task will be added in this manner where one single checkbox will be available for task completion,
        and also there will be two buttons one is for editing the task another is for deletion of the task if not required or completed.
    */



    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button)=>{
        button.onclick = () =>{
            button.parentNode.remove();
            taskCount -=1;
            displayCount(taskCount);
        };
    });

    /* any of the delete buttons inside task list will remove the entire task from the list via using the parentNode removal */

    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editBtn)=>{
        editBtn.onclick = (e) =>{
            let targetElement = e.target;
            if(!(e.target.className == "edit")){
                targetElement = e.target.parentElement;
            }
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount-=1;
            displayCount(taskCount);
        };
    });
    const tasksCheck = document.querySelectorAll(".task-check");
    tasksCheck.forEach((checkBox)=>{
        checkBox.onchange = ()=>{
            checkBox.nextElementSibling.classList.toggle("completed");
            if(checkBox.checked){
                taskCount-=1;
            }else{
                taskCount+=1;
            }
            displayCount(taskCount);
        };
    });
    taskCount+=1;
    displayCount(taskCount);
    newTaskInput.value="";
};

addBtn.addEventListener("click",addTask);

window.onload=()=>{
    taskCount=0;
    displayCount(taskCount);
    newTaskInput.value="";
}