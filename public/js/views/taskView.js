import {escapeHtml} from "../modules/escape.js";
import {TaskModel} from "../models/taskModel.js";


class TaskView {

    constructor(htmlElem) {
        this.renderTo = htmlElem;
        this.taskModel = new TaskModel();
    }

    render() {
        const tasks = this.taskModel.tasks;
        let generatedHtml = '';
        generatedHtml += `
            <div class="header">
                Task manager
                <hr class="header__line">
            </div>
            <div class="task-manager">
                
            <div class="task-manager__tasks">
            `;

        generatedHtml += `<form class="task-form js-task-form">
                    <div class="task__name">
                        <input required name="taskName" class="task__name-input" placeholder="Type the problem name" maxlength="40">
                    </div>
                    <hr>
                    <div class="task__description">
                        <textarea required name="taskDescription" class="task__description-input" placeholder="Type the problem description" rows="6"></textarea>
                    </div>
                    <hr>
                    <div class="task__manage-bar">
                        <button class="add-button" type="submit">+</button>
                    </div>
                </form>`;

        tasks.forEach(val => {
            generatedHtml += `<div class="task `;

            if (val.done === true) {
                generatedHtml += 'task_done';
            }

            generatedHtml+= `" data-taskId="${val.id}">`;

            generatedHtml += this.generateTaskFilling(val);

            generatedHtml += `</div>`;
        });
        this.renderTo.innerHTML = generatedHtml;
        this.initHandlers();
    }

    initHandlers() {

        [...this.renderTo.getElementsByClassName('js-delete-task')].forEach(el => {
            el.addEventListener('click', evt => {
                evt.preventDefault();
                const target = evt.currentTarget;
                const taskNode = target.parentElement.parentElement;
                this.taskModel.deleteTask(Number(taskNode.getAttribute('data-taskId')));
                taskNode.remove();
            })
        });

        [...this.renderTo.getElementsByClassName('js-check-task')].forEach(el => {
            el.addEventListener('click', evt => {
                evt.preventDefault();
                const target = evt.currentTarget;
                const taskNode = target.parentNode.parentNode;
                this.taskModel.markDoneTask(Number(taskNode.getAttribute('data-taskid')));
                taskNode.classList.add('task_done');
                target.remove();
            })
        });

        this.renderTo.getElementsByClassName('js-task-form')[0].addEventListener('submit', evt => {
            evt.preventDefault();
            const form = evt.target;
            const formData = form.elements;
            const name = escapeHtml(formData.taskName.value);
            let description = escapeHtml(formData.taskDescription.value);
            form.reset();
            description = description.replace(/\n\r?/g, '<br />');
            const addedTask = this.taskModel.addTask(name, description);
            const newTaskElem = document.createElement('div');
            newTaskElem.classList.add('task');
            newTaskElem.setAttribute('data-taskid', addedTask.id);
            newTaskElem.innerHTML = this.generateTaskFilling(addedTask);
            form.parentElement.insertBefore(newTaskElem, form.nextSibling);

            [...newTaskElem.getElementsByClassName('js-delete-task')].forEach(el => {
                el.addEventListener('click', evt => {
                    evt.preventDefault();
                    const target = evt.currentTarget;
                    const taskNode = target.parentElement.parentElement;
                    this.taskModel.deleteTask(Number(taskNode.getAttribute('data-taskId')));
                    console.log(taskNode.getAttribute('data-taskid'));
                    taskNode.remove();
                })
            });

            [...newTaskElem.getElementsByClassName('js-check-task')].forEach(el => {
                el.addEventListener('click', evt => {
                    evt.preventDefault();
                    const target = evt.currentTarget;
                    const taskNode = target.parentNode.parentNode;
                    this.taskModel.markDoneTask(Number(taskNode.getAttribute('data-taskid')));
                    taskNode.classList.add('task_done');
                    target.remove();
                })
            });
        })
    }

    generateTaskFilling(task) {
        let generatedHtml = ``;
        generatedHtml += `<div class="task__name">`;

        generatedHtml += task.name;

        generatedHtml += `</div>
                <hr>
                <div class="task__description">`;

        generatedHtml += task.description;

        generatedHtml += `</div>
                <hr>
                <div class="task__manage-bar">
                    <button class="task__button js-delete-task">
                        <img class="task__image" src="/image/garbage-red.png">
                    </button>`;
        if (!task.done) {
            generatedHtml += `<button class="task__button js-check-task">
                        <img class="task__image" src="/image/checked-active.png">
                    </button>`;
        }

        generatedHtml += `</div>`;

        return generatedHtml;
    }

    clear() {
        this.renderTo.innerHTML = '';
    }
}

export {TaskView}