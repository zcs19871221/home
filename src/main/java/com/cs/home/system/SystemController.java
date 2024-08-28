package com.cs.home.system;


import com.cs.home.common.Response;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Paths;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/system")
@CrossOrigin
public class SystemController {

    @GetMapping("/read")
    @ResponseBody
    String read(String path) throws Exception {
        return Files.readString(Paths.get(URLDecoder.decode(path)));
    }

    @PutMapping("/shutdown")
    Response<String> shutdown() {
        System.exit(0);
        return Response.EmptyResponse();
    }

    @GetMapping("/run")
    Response<String> shutdown(String command) throws IOException {
        command = URLDecoder.decode(command);
        String[] commands = command.split(" ");
        if (System.getProperty("os.name").startsWith("Windows") && !commands[0].startsWith(".")) {
            commands[0] = commands[0] + ".cmd";
        }

        ProcessBuilder pb = new ProcessBuilder(commands);
        pb.start();
        return Response.EmptyResponse();
    }

}
