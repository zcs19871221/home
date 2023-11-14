package com.cs.home.dateTime;

import com.cs.home.common.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.ZoneId;

@RestController
@RequestMapping("/dateAndTime")
@RequiredArgsConstructor
public class DateTimeController {

    private final DateTimeService dateTimeService;

    @PostMapping
    Response<SavedDateTimeResponse> save(@RequestBody @Valid SaveDateTimePayload saveDateTimePayload) {
        return Response.create(dateTimeService.save(saveDateTimePayload));
    }

    @GetMapping("/{id}")
    Response<QueriedDateTimeResponse> get(@PathVariable Integer id,
                                          @RequestParam ZoneId zone) {
        return Response.create(dateTimeService.get(id, zone));
    }
}
