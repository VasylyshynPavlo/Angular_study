import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Task {
  title: string;
  deadline: Date;
  priority: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: Task[] = [];
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      deadline: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const newTask: Task = this.taskForm.value;
      this.tasks.push(newTask);
      this.taskForm.reset();
    }
  }

  removeTask(index: number): void {
    this.tasks.splice(index, 1);
  }
}