document.addEventListener('DOMContentLoaded', function() {

    console.log('ready')

    //Update Active Task no. 

    var elTaskList = document.querySelector('.list');
    var elActiveTasks;
    var elCompletedTasks = document.querySelectorAll('.list_task.completed')
    var elAllTasks = document.querySelectorAll('.list_task')

    var taskCounter = 0;
    var elCounter = document.querySelector('.list_bar_info')

    function updateCounter() {
        console.log('upadated')
        elActiveTasks = document.querySelectorAll('.list_task.active')
        taskCounter = elActiveTasks.length-1
        elCounter.innerHTML = taskCounter + ' items left'
    } 
    
    updateCounter()


    //Create New Task    

    var elNewBtn = document.querySelector('.new_ready');
    var elNewTask = document.querySelector('.new_task')
    
    function createElement(elPattern, elInput, elParent, whereValue) {
        var clonedEl = elPattern.cloneNode(true);
        if (!elInput.value) {
            elInput.placeholder = 'You need to describe the task';
        } else {
            clonedEl.classList.remove('task_pattern');
            clonedEl.children[whereValue].textContent = elInput.value;
            elParent.insertBefore(clonedEl, elParent.firstChild);
            elInput.value = '';
            updateCounter();
        }
    }

    elNewBtn.addEventListener('click', function(){
        var newListedTask = document.querySelector('.task_pattern').cloneNode(true);
        createElement(newListedTask, elNewTask, elTaskList, 1)
    }) 

    //Change task to completed or to active

    function toggleCompleted (e) {
        e.target.parentNode.classList.toggle('active');
        e.target.parentNode.classList.toggle('completed');
        updateCounter();
    }

    //Delete task

    function deleteTask (e) {
        if (e.target.parentNode.classList.contains('active')) {
            e.target.parentNode.remove();
            updateCounter();
        } else {
            e.target.parentNode.remove();
        }
        
    }

    //Delete completed tasks

    function clearCompleted(e) {
        var allTasks = e.currentTarget.children
        for (var i = 0; i < allTasks.length-2; i++) {
            if (allTasks[i].classList.contains('completed')) {
                allTasks[i].remove();
                i--
            }
        }
    }


    elTaskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('list_task_check')) {
            toggleCompleted(e)
        } else if (e.target.classList.contains('list_task_delete')) {
            deleteTask(e)
        } else if (e.target.classList.contains('list_bar_clear')) {
            clearCompleted(e)
        } else {
            return false
        }
    })



    //Filter All/Active/Completed



    //Change Theme

    //Drag and drop to reorder list
    
})