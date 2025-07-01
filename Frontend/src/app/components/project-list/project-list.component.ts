import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  showForm = false;
  editingProject: Project | null = null;

  newProject: Project = {
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  };

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error loading projects:', error);
      }
    );
  }

  selectProject(project: Project): void {
    this.selectedProject = project;
  }

  showAddForm(): void {
    this.showForm = true;
    this.editingProject = null;
    this.newProject = {
      name: '',
      description: '',
      startDate: '',
      endDate: ''
    };
  }

  editProject(project: Project): void {
    this.showForm = true;
    this.editingProject = project;
    this.newProject = { ...project };
  }

  saveProject(): void {
    if (this.editingProject) {
      // Update existing project
      this.projectService.updateProject(this.editingProject.id!, this.newProject).subscribe(
        () => {
          this.loadProjects();
          this.hideForm();
        },
        (error) => {
          console.error('Error updating project:', error);
        }
      );
    } else {
      // Create new project
      this.projectService.createProject(this.newProject).subscribe(
        () => {
          this.loadProjects();
          this.hideForm();
        },
        (error) => {
          console.error('Error creating project:', error);
        }
      );
    }
  }

  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe(
        () => {
          this.loadProjects();
          if (this.selectedProject?.id === id) {
            this.selectedProject = null;
          }
        },
        (error) => {
          console.error('Error deleting project:', error);
        }
      );
    }
  }

  hideForm(): void {
    this.showForm = false;
    this.editingProject = null;
  }
}