package com.cs.home;

import com.cs.home.tag.TagPayload;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.jdbc.JdbcTestUtils;
import org.springframework.test.web.servlet.MvcResult;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


class TagTests extends BaseIntegrationTest {

    public static TagPayload create() {
        return TagPayload.builder().name("算法").build();
    }


    @BeforeEach
    void cleanTable() {
        JdbcTestUtils.deleteFromTables(jdbcTemplate, "post_tag", "post",
                "tag");
    }

    @Test
    void shouldCreateTagSuccessful() throws Exception {
        TagPayload tagPayload = create();
        save(tagPayload);
    }

    @Test
    void shouldDisplayErrorMessageWhenDuplicateName() throws Exception {
        TagPayload tagPayload = create();

        myPost("/tags", tagPayload)
                .andExpect(status().isOk());

        myPost("/tags", tagPayload).andExpect(status().is4xxClientError());
    }

    @Test
    void shouldDeleteSuccessful() throws Exception {
        TagPayload tagPayload = create();

        Integer id = save(tagPayload);

        myGet("/tags").andExpect(jsonPath("data", hasSize(1)));

        myDelete("/tags/" + id).andExpect(status().isOk());

        myGet("/tags").andExpect(jsonPath("data", hasSize(0)));
    }

    @Test
    void shouldReturnErrorMessagesWithInvalidPayload() throws Exception {

        TagPayload tagPayload = create();
        tagPayload.setName("");
        myPost("/tags", tagPayload).andExpect(status().is4xxClientError()).andExpect(jsonPath("data", containsString("'name' must not be blank")));


        tagPayload.setName("r".repeat(51));
        myPost("/tags", tagPayload).andExpect(status().is4xxClientError()).andExpect(jsonPath("data", containsString("50")));

    }

    @Test
    void shouldUpdateSuccessful() throws Exception {
        TagPayload tagPayload = create();

        Integer id = save(tagPayload);


        tagPayload.setName("随笔");
        myPut("/tags" + "/" + id, tagPayload).andExpect(status().isOk());

        myGet("/tags").andExpect(jsonPath("data[0].name", is("随笔")));
    }

    public Integer save(TagPayload tagPayload) throws Exception {
        MvcResult result = myPost("/tags", tagPayload)
                .andExpect(status().isOk()).andExpect(jsonPath("data.id").isNumber()).andReturn();

        String response = result.getResponse().getContentAsString();
        return JsonPath.parse(response).read("data.id");
    }

}
