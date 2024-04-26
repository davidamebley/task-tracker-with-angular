import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';
import { TaskItemComponent } from "../task-item/task-item.component";
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [NgFor, TaskItemComponent, AddTaskComponent]
})
export class TasksComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => (
      this.tasks = this.tasks.filter((t) => t.id !== task.id)
    ));
  };

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => (this.tasks.push(task)));
  }

}
