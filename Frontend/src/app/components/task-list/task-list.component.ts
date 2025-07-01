import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() projectId!: number;
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  showForm = false;
  editingTask: Task | null = null;
  
  // Filter properties
  statusFilter = '';
  titleFilter = '';

  newTask: Task = {
    title: '',
    description: '',
    status: 'PENDING',
    dueDate: ''
  };

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  ngOnChanges(): void {
    if (this.projectId) {
      this.loadTasks();
    }
  }

  loadTasks(): void {
    this.projectService.getProjectTasks(this.projectId).subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.applyFilters();
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter(task => {
      const matchesStatus = !this.statusFilter || task.status === this.statusFilter;
      const matchesTitle = !this.titleFilter || 
        task.title.toLowerCase().includes(this.titleFilter.toLowerCase());
      return matchesStatus && matchesTitle;
    });
  }

  onStatusFilterChange(): void {
    this.applyFilters();
  }

  onTitleFilterChange(): void {
    this.applyFilters();
  }

  showAddForm(): void {
    this.showForm = true;
    this.editingTask = null;
    this.newTask = {
      title: '',
      description: '',
      status: 'PENDING',
      dueDate: '',
      projectId: this.projectId
    };
  }

  editTask(task: Task): void {
    this.showForm = true;
    this.editingTask = task;
    this.newTask = { ...task };
  }

  saveTask(): void {
    this.newTask.projectId = this.projectId;
    
    if (this.editingTask) {
      // Update existing task
      this.taskService.updateTask(this.editingTask.id!, this.newTask).subscribe(
        () => {
          this.loadTasks();
          this.hideForm();
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    } else {
      // Create new task
      this.taskService.createTask(this.projectId,this.newTask).subscribe(
        () => {
          this.loadTasks();
          this.hideForm();
        },
        (error) => {
          console.error('Error creating task:', error);
        }
      );
    }
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(
        () => {
          this.loadTasks();
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }

  hideForm(): void {
    this.showForm = false;
    this.editingTask = null;
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'completed': return 'badge bg-success';
      case 'in_progress': return 'badge bg-warning';
      case 'PENDING': return 'badge bg-secondary';
      default: return 'badge bg-secondary';
    }
  }
}