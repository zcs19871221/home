package com.cs.home.project;

import com.cs.home.common.Response;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
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


    @GetMapping("/vscode/{npmProjectId}")
    public Response<String> vscode(@PathVariable Integer npmProjectId) throws IOException {
        service.openNpmProject(npmProjectId);
        return Response.EmptyResponse();
    }

    @PutMapping("/vscodeError")
    public Response<String> vscodeError(@RequestBody String path) throws IOException {
        String p = URLDecoder.decode(path, StandardCharsets.UTF_8);
        service.locateErrorWithVscode(p);
        return Response.EmptyResponse();
    }


}
