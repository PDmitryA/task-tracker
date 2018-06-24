import {localStorage} from "../modules/localStorage.js";

const taskListKey = "taskList";

class TaskModel {

    constructor() {
        this.storage = localStorage;
        this.taskList = this.storage.getItem(taskListKey) || [];
        this.maxId = Math.max(0, ...this.taskList.map((el) => el.id));
    }

    markDoneTask(taskId) {
        this.taskList.some((val, num, tl) => {
            if (val.id === taskId) {
                tl[num].done = true;
                this.save();
                return true;
            }
            return false;
        });
        return this;
    }

    deleteTask(taskId) {
        this.taskList.some((val, num, tl) => {
            if (val.id === taskId) {
                tl.splice(num, 1);
                this.save();
                return true;
            }
            return false;
        });
        return this;
    }

    addTask(name, description) {
        const task = {
            id: ++this.maxId,
            name,
            description,
            done: false
        };
        this.taskList.unshift(task);
        this.save();
        return task;
    }

    get tasks() {
        return this.taskList;
    }

    save() {
        this.storage.setItem(taskListKey, this.taskList);
        return this;
    }
}

export {TaskModel};