package com.cs.home;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class BaseIntegrationTest {

    protected static final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected JdbcTemplate jdbcTemplate;


    protected ResultActions myPost(String url, String[][] body) throws Exception {
        return postOrPut(url, body, true);
    }

    protected ResultActions myPut(String url, String[][] body) throws Exception {
        return postOrPut(url, body, false);
    }

    protected ResultActions myDelete(String url) throws Exception {
        url = initUrl(url);
        return mockMvc.perform(delete(url)
                .contentType(MediaType.APPLICATION_JSON));
    }

    protected ResultActions myGet(String url) throws Exception {
        url = initUrl(url);
        return mockMvc.perform(get(url)
                .contentType(MediaType.APPLICATION_JSON));
    }

    private String initUrl(String url) {
        String formatedUrl = url;
        if (!formatedUrl.startsWith("/")) {
            formatedUrl = "/" + url;
        }
        if (!formatedUrl.startsWith("/api")) {
            formatedUrl = "/api" + url;
        }
        return formatedUrl;
    }

    protected ResultActions postOrPut(String url, String[][] body,
                                      boolean isPost) throws Exception {
        url = initUrl(url);
        Map<String, String> requestBody = new HashMap<>();
        for (String[] strings : body) {
            String key = strings[0];
            String value = strings[1];
            requestBody.put(key, value);
        }
        if (isPost) {
            return mockMvc.perform(post(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(requestBody)));
        }

        return mockMvc.perform(put(url)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestBody)));
    }


}
