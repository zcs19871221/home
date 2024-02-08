package com.cs.home.NpmProjects;

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
@RequestMapping(path = "/api/npmProjects")
@CrossOrigin
public class NpmProjectsController {

    private final NpmProjectsService service;

    @GetMapping
    public Response<List<NpmProjectResponse>> list() throws Exception {
        List<NpmProjectResponse> seResponses = service.list();
        return Response.create(seResponses);
    }

    @PutMapping
    public Response<NpmProjectResponse> update(@Valid @RequestBody NpmProjectUpdated npmProjectUpdated) throws Exception {
        return Response.create(service.update(npmProjectUpdated));
    }

    @PostMapping
    public Response<NpmProjectResponse> save(@Valid @RequestBody NpmProjectCreated npmProjectCreated) throws Exception {
        return Response.create(service.save(npmProjectCreated));
    }

    @DeleteMapping("/{id}")
    public Response<String> delete(@PathVariable Integer id) {
        service.delete(id);
        return Response.EmptyResponse();
    }


    @PutMapping("/vscode/{target}")
    public Response<String> vscode(@PathVariable String target) throws IOException {
        service.vsCode(URLDecoder.decode(target, StandardCharsets.UTF_8));
        return Response.EmptyResponse();
    }


}
