package com.cs.home.se;

import com.cs.home.common.Response;
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
public class SeController {

    private final SeService service;

    @GetMapping("/list")
    public Response<List<SeResponse>> list() {
        List<SeResponse> seResponses = service.getAll();
        return Response.create(seResponses);
    }

    @PutMapping("/{id}")
    public Response<SeResponse> update(@Valid @RequestBody SeUpdatePayload seUpdatePayload,
                                       @PathVariable Integer id) {
        return Response.create(service.update(id, seUpdatePayload));
    }

    @PostMapping
    public Response<SeResponse> save(@Valid @RequestBody SeCreatePayload seCreatePayload) {
        return Response.create(service.save(seCreatePayload));
    }

    @DeleteMapping("/{id}")
    public Response<String> delete(@PathVariable Integer id) {
        service.delete(id);
        return Response.EmptyResponse();
    }

    @PutMapping("/start/{id}")
    public Response<String> start(@PathVariable Integer id) throws IOException {
        service.getOrCreateSeProcess(id);
        return Response.EmptyResponse();
    }

    @PutMapping("/stop/{id}")
    public Response<String> stop(@PathVariable Integer id) {
        service.stopSeProcess(id);
        return Response.EmptyResponse();
    }

    @PutMapping("/restart/{id}")
    public Response<String> restart(@PathVariable Integer id) throws IOException {
        service.stopSeProcess(id);
        service.getOrCreateSeProcess(id);
        return Response.EmptyResponse();
    }

    @PutMapping("/replace")
    public Response<String> replace(@RequestBody @Valid ReplacePayload replacePayload) throws IOException {
        service.replaceFile(replacePayload);
        return Response.EmptyResponse();
    }


    @PutMapping("/vscode/{target}")
    public Response<String> vscode(@PathVariable String target) throws IOException {
        service.vsCode(URLDecoder.decode(target, StandardCharsets.UTF_8));
        return Response.EmptyResponse();
    }

    @GetMapping("/logs")
    public Response<Map<Integer, LogInfo>> logs() throws IOException {
        return Response.create(service.getLogs());
    }
}
