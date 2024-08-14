package com.cs.home.nodeServer;

import com.cs.home.common.Response;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/nodeServers")
@CrossOrigin
public class NodeServerController {

    private final NodeServersService nodeServersService;

    @PostMapping
    Response<NodeServerResponse> create(@RequestBody @Valid NodeServerCreated nodeServerCreated) throws Exception {
        return Response.create(nodeServersService.create(nodeServerCreated));
    }

    @PutMapping
    Response<NodeServerResponse> update(@RequestBody @Valid NodeServerUpdated nodeServerUpdated) throws Exception {
        return Response.create(nodeServersService.update(nodeServerUpdated));
    }


    @DeleteMapping("/{nodeServerId}")
    Response<String> delete(@PathVariable Integer nodeServerId) throws IOException {
        nodeServersService.delete(nodeServerId);
        return Response.EmptyResponse();
    }

    @PutMapping("/start/{nodeServerId}")
    Response<String> startServer(@PathVariable Integer nodeServerId) throws IOException {
        nodeServersService.start(nodeServerId);
        return Response.EmptyResponse();
    }

    @PutMapping("/stop/{nodeServerId}")
    Response<String> stopServer(@PathVariable Integer nodeServerId) throws IOException {
        nodeServersService.stop(nodeServerId);
        return Response.EmptyResponse();
    }

    @PutMapping("/restart/{nodeServerId}")
    Response<String> restartServer(@PathVariable Integer nodeServerId) throws IOException {
        nodeServersService.restart(nodeServerId);
        return Response.EmptyResponse();
    }

    @GetMapping
    Response<List<NodeServerResponse>> list() throws Exception {
        return Response.create(nodeServersService.list());
    }

    @GetMapping("/runningInfos")
    Response<Map<Integer, NodeServerRunningInfo>> serverRunningInfos() throws Exception {
        return Response.create(nodeServersService.runningInfo());
    }

    @GetMapping("/logs/{nodeServerId}")
    @ResponseBody
    String logs(@PathVariable Integer nodeServerId) throws Exception {
        return nodeServersService.logs(nodeServerId);
    }


    @DeleteMapping("/logs/{nodeServerId}")
    Response<String> clearLog(@PathVariable Integer nodeServerId) throws Exception {
        nodeServersService.clearLog(nodeServerId);
        return Response.EmptyResponse();
    }


}
