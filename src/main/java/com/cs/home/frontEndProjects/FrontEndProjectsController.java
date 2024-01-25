package com.cs.home.frontEndProjects;

import com.cs.home.common.Response;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/se")
@CrossOrigin
public class FrontEndProjectsController {

    private final FrontEndProjectService service;

    @GetMapping("/list")
    public Response<List<FrontEndProjectResponse>> list() throws Exception {
        File f = new File("c:/sdffds");
        List<FrontEndProjectResponse> seResponses = service.getAll();
        return Response.create(seResponses);
    }

    @PutMapping("/{id}")
    public Response<FrontEndProjectResponse> update(@Valid @RequestBody UpdateFrontEndProjectPayload seUpdatePayload,
                                                    @PathVariable Integer id) {
        return Response.create(service.update(id, seUpdatePayload));
    }

    @PostMapping
    public Response<FrontEndProjectResponse> save(@Valid @RequestBody CreateFrontEndProjectPayload seCreatePayload) {
        return Response.create(service.save(seCreatePayload));
    }

    @DeleteMapping("/{id}")
    public Response<String> delete(@PathVariable Integer id) {
        service.delete(id);
        return Response.EmptyResponse();
    }

    @PutMapping("/start/{id}")
    public Response<String> start(@PathVariable Integer id) throws IOException {
        service.getOrStartFrontEndServer(id);
        return Response.EmptyResponse();
    }

    @PutMapping("/stop/{id}")
    public Response<String> stop(@PathVariable Integer id) {
        service.stopFrontEndServer(id);
        return Response.EmptyResponse();
    }

    @PutMapping("/restart/{id}")
    public Response<String> restart(@PathVariable Integer id) throws IOException {
        service.stopFrontEndServer(id);
        service.getOrStartFrontEndServer(id);
        return Response.EmptyResponse();
    }

    @PutMapping("/port/{projectId}/{port}")
    public Response<String> changePort(@PathVariable Integer projectId,
                                       @PathVariable Integer port) throws Exception {
        service.changePort(projectId, port);
        return Response.EmptyResponse();
    }

    @GetMapping("/port/{path}")
    public Response<Integer> getPort(@PathVariable String path) throws Exception {

        return Response.create(service.getPort(URLDecoder.decode(path,
                StandardCharsets.UTF_8)));
    }


    @PutMapping("/vscode/{target}")
    public Response<String> vscode(@PathVariable String target) throws IOException {
        service.vsCode(URLDecoder.decode(target, StandardCharsets.UTF_8));
        return Response.EmptyResponse();
    }

    @GetMapping("/logs")
    public Response<Map<Integer, FrontEndServerLog>> logs() throws IOException {
        return Response.create(service.getLogs());
    }


}
