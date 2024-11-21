const fs = require('fs');
const filePath = "./tasks.json";



const command = process.argv[2];
const argument = process.argv[3];


const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return []
    }
}

const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks);
    fs.writeFileSync(filePath, dataJSON);
}

const listTasks = () => {
    const tasks = loadTasks();
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.task}`);
    });
}

const removeTask = (index) => {
    const tasks = loadTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
}


const addTask = (task) => {
    const tasks = loadTasks();
    tasks.push({task});
    saveTasks(tasks);
    console.log("Task added successfully", task);

}

if(command === "add"){
    addTask(argument);
}else if(command === "list"){
    listTasks();
}else if(command === "remove"){
    removeTask(parseInt(argument));
}else{
    console.log("Invalid command");
}