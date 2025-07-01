package TEST.hatim_el_mestari.Spring_boot.Project;


import TEST.hatim_el_mestari.Spring_boot.Task.Task;
import TEST.hatim_el_mestari.Spring_boot.Task.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id)
                .map(project -> ResponseEntity.ok().body(project))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectService.createProject(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project projectDetails) {
        try {
            Project updatedProject = projectService.updateProject(id, projectDetails);
            return ResponseEntity.ok(updatedProject);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/tasks")
    public List<Task> getProjectTasks(@PathVariable Long id) {
        return taskService.getTasksByProjectId(id);
    }
    @PostMapping("/{id}/tasks")
    public ResponseEntity<Task> createTaskForProject(
            @PathVariable Long id,
            @RequestBody Task taskRequest) {

        try {
            Task createdTask = taskService.createTaskForProject(id, taskRequest);
            return ResponseEntity.ok(createdTask);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/{id}/tasks/{taskId}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @PathVariable Long taskId,
            @RequestBody Task updatedTask) {

        try {
            Task task = taskService.updateTask(id, taskId, updatedTask);
            return ResponseEntity.ok(task);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}/tasks/{taskId}")
    public ResponseEntity<?> deleteTask(
            @PathVariable Long id,
            @PathVariable Long taskId) {

        try {
            taskService.deleteTask(id, taskId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
