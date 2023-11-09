package com.cs.home;

import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.jdbc.JdbcTestUtils;
import org.springframework.test.web.servlet.MvcResult;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


class TagTests extends BaseIntegrationTest {

    @BeforeEach
    void cleanTable() {
        JdbcTestUtils.deleteFromTables(jdbcTemplate, "tag");
    }


    @Test
    void shouldCreateTagSuccessful() throws Exception {

        myPost("/tags", new String[][]{new String[]{"name", "算法"}})
                .andExpect(status().isOk())
                .andExpect(jsonPath("data.name")
                        .value("算法"))
                .andExpect(jsonPath("data.id").isNumber());
        myPost("/tags", new String[][]{new String[]{"name", "算法"}}).andExpect(status().is4xxClientError());
    }

    @Test
    void shouldDisplayErrorMessageWhenDuplicateName() throws Exception {

        myPost("/tags", new String[][]{new String[]{"name", "算法"}})
                .andExpect(status().isOk());

        myPost("/tags", new String[][]{new String[]{"name", "算法"}}).andExpect(status().is4xxClientError());
    }

    @Test
    void shouldDeleteSuccessful() throws Exception {
        MvcResult result = myPost("/tags", new String[][]{new String[]{"name",
                "算法"}})
                .andExpect(status().isOk()).andExpect(jsonPath("data.id").isNumber()).andReturn();

        String response = result.getResponse().getContentAsString();
        Integer id = JsonPath.parse(response).read("data.id");

        myGet("/tags").andExpect(jsonPath("data", hasSize(1)));

        myDelete("/tags/" + id).andExpect(status().isOk());

        myGet("/tags").andExpect(jsonPath("data", hasSize(0)));
    }

    @Test
    void shouldReturnErrorMessagesWithInvalidPayload() throws Exception {
        myPost("/tags", new String[][]{new String[]{"name",
                ""}}).andExpect(status().is4xxClientError()).andExpect(jsonPath("data", containsString("'name' must not be blank")));


        myPost("/tags", new String[][]{new String[]{"name",
                "r".repeat(51)}}).andExpect(status().is4xxClientError()).andExpect(jsonPath("data", containsString("50")));

    }

    @Test
    void shouldUpdateSuccessful() throws Exception {
        MvcResult result = myPost("/tags", new String[][]{new String[]{"name",
                "算法"}})
                .andExpect(status().isOk()).andExpect(jsonPath("data.id").isNumber()).andReturn();

        String response = result.getResponse().getContentAsString();
        Integer id = JsonPath.parse(response).read("data.id");

        myPut("/tags" + "/" + id, new String[][]{new String[]{"name",
                "随笔"}}).andExpect(status().isOk());

        myGet("/tags").andExpect(jsonPath("data[0].name", is("随笔")));


    }


}
