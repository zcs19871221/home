package com.cs.home.NodeServers;

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
    Response<NodeServerResponse> createOrUpdate(@RequestBody @Valid NodeServerCreatedOrUpdated nodeServerCreatedOrUpdated) throws Exception {
        return Response.create(nodeServersService.createOrUpdate(nodeServerCreatedOrUpdated));
    }

    @PostMapping("/batch")
    Response<List<NodeServerResponse>> createOrUpdateList(@RequestBody @Valid List<NodeServerCreatedOrUpdated> nodeServerCreatedOrUpdatedList) throws Exception {
        return Response.create(nodeServersService.createOrUpdateList(nodeServerCreatedOrUpdatedList));
    }


    @DeleteMapping("/{nodeServerId}")
    Response<String> delete(@PathVariable Integer nodeServerId) throws IOException {
        nodeServersService.delete(nodeServerId);
        return Response.EmptyResponse();
    }

    @PutMapping("/start/{nodeServerId}")
    Response<String> startServer(@PathVariable Integer nodeServerId) throws IOException {
        nodeServersService.startServer(nodeServerId);
        return Response.EmptyResponse();
    }

    @PutMapping("/stop/{nodeServerId}")
    Response<String> stopServer(@PathVariable Integer nodeServerId) throws IOException {
        nodeServersService.stopServer(nodeServerId);
        return Response.EmptyResponse();
    }

    @PutMapping("/restart/{nodeServerId}")
    Response<String> restartServer(@PathVariable Integer nodeServerId) throws IOException {
        nodeServersService.restartServer(nodeServerId);
        return Response.EmptyResponse();
    }

    @GetMapping
    Response<List<NodeServerResponse>> servers() throws Exception {
        return Response.create(nodeServersService.servers());
    }

    @GetMapping("/runningInfos")
    Response<Map<Integer, NodeServerRunningInfo>> serverRunningInfos() throws Exception {
        return Response.create(nodeServersService.serverRunningInfos());
    }

    @GetMapping("/clearLog/{nodeServerId}")
    Response<String> clearLog(@PathVariable Integer nodeServerId) throws Exception {
        nodeServersService.clearLog(nodeServerId);
        return Response.EmptyResponse();
    }

    @PutMapping("/changePort/{nodeServerId}/{port}")
    Response<String> changePort(@PathVariable Integer nodeServerId,
                                @PathVariable Integer port) throws Exception {
        nodeServersService.changePort(nodeServerId, port);
        return Response.EmptyResponse();
    }


}
