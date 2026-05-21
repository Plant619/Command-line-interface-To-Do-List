// 1. store task
// 2. display task and completion
// 3. add task
// 4. remove  task
// 5. mark task as complete
// 6. track tasks 
// 7. accept user input to select option

// problem: changes in task are not reflected in code after program exits

// Things to add
// mark all complete
// filter to show just incomplete
// memory to reflect changes made in console to persist to next session
// simplify code (reusable parts)

const input = require('readline-sync');

const tasks = [
    {name: "Do laundry", completed: false}, 
    {name: "Study JS", completed: true}
];

let chosen;

// ----------------------------------------------------- 1 -------------------------------------------------

function displayTasks() {
    if (tasks.length == 0) {
        console.log("You currently have no tasks")
    } else {
        console.log("Task list")
        for (let i = 0; i < tasks.length; i++) {
            // completed
            if (tasks[i].completed) { 
                console.log(`${i + 1}. [\u2713] ${tasks[i].name}`)

            // incomplete
            } else { 
                console.log(`${i + 1}. [ ] ${tasks[i].name}`)
            }
        }
    }

}

// ----------------------------------------------------- 2 -------------------------------------------------

function getMarkComplete() {
    displayTasks();

    let completedTask = input.question("Please enter the number that corresponds to the task you would like to mark complete or enter 0 to exit to main menu:")

    return completedTask;
}

function markComplete(ID) {
    if (ID >= tasks.length || isNaN(ID)) {
        // choose a valid option one
        console.clear();
        console.log("Please enter a valid number");
        return false;
    } else if (ID == -1) {
        // exit
        return 'exit';
    } else {
        tasks[ID].completed = true;
        console.log("---------------------------------------------------------------------------------------------");
        displayTasks();
        return true;
    }
}

// ----------------------------------------------------- 3 -------------------------------------------------
function getMarkIncomplete() {
    displayTasks();

    let incompleteTask = input.question("Please enter the number that corresponds to the task you would like to mark incomplete or enter 0 to exit to main menu:")

    return incompleteTask;
}

function markIncomplete(ID) {
    if (ID >= tasks.length || isNaN(ID)) {
        // choose a valid option one
        console.clear();
        console.log("Please enter a valid number");
        return false;
    } else if (ID == -1) {
        // exit
        return 'exit';
    } else {
        tasks[ID].completed = false;
        console.log("---------------------------------------------------------------------------------------------");
        displayTasks();
        return true;
    }
}

// ----------------------------------------------------- 4 -------------------------------------------------
function addTask(task) {
    tasks.push(
        {name: task, completed: false}
    );
}

// ----------------------------------------------------- 5 -------------------------------------------------
function deleteTask(taskID) {
    tasks.splice(taskID, 1);
} 

// ----------------------------------------------------- Main loop -------------------------------------------------

while (chosen != 0) {
    chosen = Number(input.question("Please enter the number corresponding to the option you would like to select: \n1. Display tasks \n2. Mark task as complete \n3. Mark task as incomplete \n4. Add task \n5. Delete Task \n0. Exit \n"));

    switch(chosen) {
        case 0: // exit
            break;

        case 1: // display task
            console.log("---------------------------------------------------------------------------------------------");
            displayTasks();
            console.log("---------------------------------------------------------------------------------------------");

            break;

        case 2: // mark complete
            console.log("---------------------------------------------------------------------------------------------");
            let taskNum = getMarkComplete();
            let isComplete;

            while (!isComplete) {
                isComplete = markComplete(taskNum - 1)

                if (isComplete == 'exit') {
                    break;
                } else if (isComplete) {

                } else {
                    taskNum = getMarkComplete();
                    // redo again 
                }
            }

            console.log("---------------------------------------------------------------------------------------------");

            break;

        case 3: // mark incomplete
            console.log("---------------------------------------------------------------------------------------------");
            let incompletedNum = getMarkIncomplete();
            let isIncomplete;

            while (!isIncomplete) {
                isIncomplete = markIncomplete(incompletedNum - 1)

                if (isIncomplete == 'exit') {
                    break;
                } else if (isIncomplete) {

                } else {
                    incompletedNum = getMarkIncomplete();
                    // redo again 
                }
            }

            console.log("---------------------------------------------------------------------------------------------");
            break;

        case 4: // add task
            console.log("---------------------------------------------------------------------------------------------");

            let taskName = input.question("Please enter the task name or enter 0 to exit to main menu: ")
            if (taskName == 0) {

            } else {
                addTask(taskName);
                displayTasks();
            }

            console.log("---------------------------------------------------------------------------------------------");

            break;

        case 5: // delete task
            console.log("---------------------------------------------------------------------------------------------");
            let isValidID; 
            displayTasks();

            while (true) {
                isValidID = input.question("Please enter the number that corresponds to the task you would like to delete or enter 0 to exit to main menu: ") - 1;
                console.log("---------------------------------------------------------------------------------------------")

                if (isValidID == -1) {
                    // exit;
                    break;

                } else if (isValidID < tasks.length) {
                    deleteTask(isValidID);
                    displayTasks();
                    break;

                } else {
                    console.clear();
                    console.log("Please enter a valid number");
                }
            }

            console.log("---------------------------------------------------------------------------------------------");

            break;

        default: 
            console.log("---------------------------------------------------------------------------------------------");
            console.log("Please enter a number between 1 - 5")
            console.log("---------------------------------------------------------------------------------------------");

            break;
        
    }
}

