package com.cs.home;

import com.cs.home.tag.TagPayload;
import com.jayway.jsonpath.JsonPath;
import net.minidev.json.JSONArray;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.jdbc.JdbcTestUtils;
import org.springframework.test.web.servlet.ResultActions;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


class TagTests extends BaseIntegrationTest {

    @BeforeEach
    void cleanTable() {
        JdbcTestUtils.deleteFromTables(jdbcTemplate, "post_tag", "post",
                "tag");
    }

    @Test
    void shouldCreateTagSuccessful() throws Exception {
        insertTag(createTag("算法")).andExpect(jsonPath("data.name").value("算法"));
    }

    @Test
    void shouldDisplayErrorMessageWhenDuplicateName() throws Exception {
        TagPayload tagPayload = createTag("算法");

        myPost("/tags", tagPayload)
                .andExpect(status().isOk());

        myPost("/tags", tagPayload).andExpect(status().is4xxClientError());
    }

    @Test
    void shouldDeleteSuccessful() throws Exception {
        TagPayload tagPayload = createTag("算法");

        Integer id = insertTagAndReturnId(tagPayload);

        myGet("/tags").andExpect(jsonPath("data", hasSize(1)));

        myDelete("/tags/" + id).andExpect(status().isOk());

        myGet("/tags").andExpect(jsonPath("data", hasSize(0)));
    }

    @Test
    void shouldReturnErrorMessagesWithInvalidPayload() throws Exception {

        TagPayload tagPayload = createTag("");
        myPost("/tags", tagPayload).andExpect(status().is4xxClientError()).andExpect(jsonPath("data", containsString("'name' must not be blank")));


        tagPayload.setName("r".repeat(51));
        myPost("/tags", tagPayload).andExpect(status().is4xxClientError()).andExpect(jsonPath("data", containsString("50")));

    }

    @Test
    void shouldUpdateSuccessful() throws Exception {
        TagPayload tagPayload = createTag("算法");

        Integer id = insertTagAndReturnId(tagPayload);


        tagPayload.setName("随笔");
        myPut("/tags" + "/" + id, tagPayload).andExpect(status().isOk());

        myGet("/tags/" + id).andExpect(jsonPath("data.name",
                is("随笔"))).andExpect(jsonPath("data.id", is(id)));
    }

    protected void validPostsInTag(Integer tagId,
                                   Set<Integer> inputPosts) throws Exception {
        String response =
                myGet("/tags/" + tagId).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        JSONArray posts = JsonPath.parse(response).read(
                "data" +
                        ".posts");
        HashSet<Integer> ids = new HashSet<>();
        for (int i = 0; i < posts.size(); i++) {
            Map<String, Object> map = (Map<String, Object>) posts.get(i);
            ids.add((Integer) map.get("id"));
        }
        assertEquals(ids, inputPosts);
    }

    protected Integer insertTagAndReturnId(TagPayload tagPayload) throws Exception {
        String response = insertTag(tagPayload).andReturn().getResponse().getContentAsString();
        return JsonPath.parse(response).read("data.id");
    }

    protected ResultActions insertTag(TagPayload tagPayload) throws Exception {
        return myPost("/tags", tagPayload)
                .andExpect(status().isOk());
    }

    protected TagPayload createTag(String name) {
        return TagPayload.builder().name(name).build();
    }


}
