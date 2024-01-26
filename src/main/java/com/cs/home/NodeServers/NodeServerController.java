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
    Response<NodeServerResponse> save(@RequestBody @Valid NodeServerCreated nodeServerCreated) throws Exception {
        return Response.create(nodeServersService.save(nodeServerCreated));
    }


    @PutMapping("/{nodeServerId}")
    Response<NodeServerResponse> update(@PathVariable Integer nodeServerId,
                                        @RequestBody @Valid NodeServerUpdated nodeServerUpdated) throws Exception {
        return Response.create(nodeServersService.update(nodeServerId,
                nodeServerUpdated));
    }

    @DeleteMapping("/{nodeServerId}")
    Response<String> delete(@PathVariable Integer nodeServerId) {
        nodeServersService.delete(nodeServerId);
        return Response.EmptyResponse();
    }

    @PutMapping("/{nodeServerId}")
    Response<String> startServer(@PathVariable Integer nodeServerId) throws IOException {
        nodeServersService.startServer(nodeServerId);
        return Response.EmptyResponse();
    }

    @PutMapping("/{nodeServerId}")
    Response<String> stopServer(@PathVariable Integer nodeServerId) {
        nodeServersService.stopServer(nodeServerId);
        return Response.EmptyResponse();
    }

    @PutMapping("/{nodeServerId}")
    Response<String> restartServer(@PathVariable Integer nodeServerId) throws IOException {
        nodeServersService.restartServer(nodeServerId);
        return Response.EmptyResponse();
    }

    @GetMapping
    Response<List<NodeServerResponse>> servers() throws Exception {
        return Response.create(nodeServersService.servers());
    }

    @GetMapping
    Response<Map<Integer, NodeServerRunningInfo>> serverRunningInfos() throws Exception {
        return Response.create(nodeServersService.serverRunningInfos());
    }

}
