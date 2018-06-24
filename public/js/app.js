'use strict';

import {TaskView} from "./views/taskView.js";

const taskView = new TaskView();


document.addEventListener("DOMContentLoaded", () => {
    taskView.renderTo = document.getElementsByClassName('app-container')[0];
    taskView.render();
});