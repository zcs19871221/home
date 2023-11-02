package com.cs.home.tag;

import com.cs.home.common.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping(path = "/tag")
public class TagController {

    private final TagService tagService;

    @PostMapping
    public Response<TagDto> saveOrUpdateTag(@RequestBody TagDto tagPayload) {
        log.info("request: GET /tag ${}", tagPayload.getName());
        return Response.create(tagService.saveOrUpdate(tagPayload));
    }


}
