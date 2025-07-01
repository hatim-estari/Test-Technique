package TEST.hatim_el_mestari.Spring_boot.Task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/search")
    public Object searchTasks(
            @RequestParam(required = false) TaskStatus status,
            @RequestParam(required = false) String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        if (page > 0 || size != 10) {
            // With pagination
            Pageable pageable = PageRequest.of(page, size);
            if (status != null) {

                return taskService.getTasksByStatusWithPagination(status, pageable);
            } else if (title != null) {
                return taskService.searchTasksByTitleWithPagination(title, pageable);
            }
        } else {
            // Without pagination
            if (status != null) {
                
                return taskService.getTasksByStatus(status);
            } else if (title != null) {
                return taskService.searchTasksByTitle(title);
            }
        }

        return List.of();
    }
}