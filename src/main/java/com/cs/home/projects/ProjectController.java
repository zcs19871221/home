package com.cs.home.projects;

import com.cs.home.common.Response;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/projects")
@CrossOrigin
public class ProjectController {

    private final ProjectService service;

    @PutMapping("/shutdown")
    public Response<String> shutDown() {
        System.exit(0);
        return Response.create("");
    }

    @GetMapping
    public Response<List<ProjectResponse>> list() throws Exception {
        List<ProjectResponse> seResponses = service.list();
        return Response.create(seResponses);
    }

    @PutMapping
    public Response<ProjectResponse> update(@Valid @RequestBody ProjectUpdated projectUpdated) throws Exception {
        return Response.create(service.update(projectUpdated));
    }

    @PostMapping
    public Response<ProjectResponse> save(@Valid @RequestBody ProjectCreated npmProjectCreated) throws Exception {
        return Response.create(service.save(npmProjectCreated));
    }

    @DeleteMapping("/{id}")
    public Response<String> delete(@PathVariable Integer id) throws Exception {
        service.delete(id);
        return Response.EmptyResponse();
    }

}
