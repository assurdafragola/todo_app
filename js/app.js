document.addEventListener('DOMContentLoaded', function() {

    console.log('ready')

    //Update Active Task no. 

    var elTaskList = document.querySelector('.list');
    var elActiveTasks;
    var elCompletedTasks;
    var elAllTasks;

    var taskCounter = 0;
    var elCounter = document.querySelector('.list_bar_info')

    function updateCounter() {
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

    function showSelectedTasks(show, hide) {
        for (var i = 0; i < hide.length; i++) { 
              hide[i].classList.add('hidden')
        }
        for (var i=0; i < show.length; i++) {
            show[i].classList.remove('hidden')
        }
    }

    function showAllTasks() {
        elAllTasks = document.querySelectorAll('.list_task')
        for (var i = 0; i < elAllTasks.length; i++) { 
            elAllTasks[i].classList.remove('hidden')
        }
    }

    var elFilter = document.querySelector('.filter')

    elFilter.addEventListener('click', function(e){
        var filterOptions = e.currentTarget.children
        for (var i = 0; i < filterOptions.length; i++ ) {
            if (filterOptions[i].classList.contains('current_option'))  {
                filterOptions[i].classList.remove('current_option')
            }
        }
        e.target.classList.add('current_option')

        if (!e.target.classList.contains('filter_option')) {
            console.log('not a button')
        } else if (e.target.id == 'filter_all') {
            showAllTasks()
        } else {
            var hide, show;
            elCompletedTasks = document.querySelectorAll('.list_task.completed')
            elActiveTasks = document.querySelectorAll('.list_task.active')
            if (e.target.id == 'filter_active') {
                hide = elCompletedTasks;
                show = elActiveTasks;
            } else if (e.target.id == 'filter_completed') {
                hide = elActiveTasks;
                show = elCompletedTasks;
            }
            showSelectedTasks(show, hide)
        }

    })

    //Change Theme

    var elThemeBtn = document.querySelector('.header_theme')

    function toggleTheme(e) {
        e.currentTarget.children[0].classList.toggle('current_theme');
        e.currentTarget.children[1].classList.toggle('current_theme');
        e.currentTarget.parentNode.parentNode.parentNode.classList.toggle('dark');
        e.currentTarget.parentNode.parentNode.parentNode.classList.toggle('light')
    }

    elThemeBtn.addEventListener('click', toggleTheme);

    //Drag and drop to reorder list
    
})