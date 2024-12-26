import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Task {
  title: string;
  deadline?: string; 
  priority: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: Task[] = [];
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      deadline: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.http.get<{ id: number, title: string, completed: boolean }[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((data) => {
        this.tasks = data.map(task => ({
          title: task.title,
          deadline: '',
          priority: 'Medium',
          completed: task.completed
        }));
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
