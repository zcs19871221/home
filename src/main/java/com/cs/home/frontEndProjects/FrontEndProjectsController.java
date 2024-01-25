package com.cs.home.seMicroFrontEnd;

import com.cs.home.common.Response;
import com.cs.home.frontEndProjects.*;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/se")
public class seMicronFrontEndController {

    private final FrontEndProjectService service;

    @GetMapping("/list")
    public Response<List<FrontEndProjectResponse>> list() {
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

    @PutMapping("/replace")
    public Response<String> replace(@RequestBody @Valid ReplaceFrontEndFilePayload replacePayload) throws IOException {
        service.replaceFile(replacePayload);
        return Response.EmptyResponse();
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