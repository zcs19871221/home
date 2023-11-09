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

    private static String initUrl(String url) {
        String formatedUrl = url;
        if (!formatedUrl.startsWith("/")) {
            formatedUrl = "/" + url;
        }
        if (!formatedUrl.startsWith("/api")) {
            formatedUrl = "/api" + url;
        }
        return formatedUrl;
    }

    protected ResultActions myPut(String url, Object body) throws Exception {
        return postOrPut(url, body, false);
    }

    protected ResultActions postOrPut(String url, Object body,
                                      boolean isPost) throws Exception {
        url = initUrl(url);

        if (isPost) {
            return mockMvc.perform(post(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(body)));
        }

        return mockMvc.perform(put(url)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)));
    }

    protected ResultActions myPost(String url, Object body) throws Exception {
        return postOrPut(url, body, true);
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


}
