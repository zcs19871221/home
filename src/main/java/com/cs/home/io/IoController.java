package com.cs.home.io;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/io")
@CrossOrigin
public class IoController {

    private final IoService ioService;

    @ResponseBody
    @GetMapping("/read")
    String read(String path) throws Exception {
        return ioService.read(URLDecoder.decode(path));
    }


}
