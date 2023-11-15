package com.cs.home;

import com.cs.home.post.PostPayload;
import com.cs.home.tag.TagPayload;
import com.jayway.jsonpath.JsonPath;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.jdbc.JdbcTestUtils;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


class PostTests extends BaseIntegrationTest {


    @BeforeEach
    void cleanTable() {
        JdbcTestUtils.deleteFromTables(jdbcTemplate, "post_tag", "post",
                "tag");
    }

    @Test
    @Transactional
    void shouldCreateUpdateDeletePostSuccessful() throws Exception {

        TagPayload tagPayload = TagTests.create();
        MvcResult result = myPost("/tags", tagPayload)
                .andExpect(status().isOk()).andExpect(jsonPath("data.id").isNumber()).andReturn();

        String response = result.getResponse().getContentAsString();
        Integer tagId = JsonPath.parse(response).read("data.id");

        TagPayload tagPayload2 = TagTests.create();
        tagPayload2.setName("随笔");
        MvcResult result2 = myPost("/tags", tagPayload2)
                .andExpect(status().isOk()).andExpect(jsonPath("data.id").isNumber()).andReturn();

        String response2 = result2.getResponse().getContentAsString();
        Integer tagId2 = JsonPath.parse(response2).read("data.id");


        Set<Integer> tags = new HashSet<>();
        tags.add(tagId);
        tags.add(tagId2);
        PostPayload postPayload = PostPayload.builder().name("标题").content(
                "正文").tags(tags).build();

        MvcResult postResult = myPost("/api/posts", postPayload)
                .andExpect(status().isOk())
                .andExpect(jsonPath("data.name")
                        .value("标题"))
                .andExpect(jsonPath("data.content").value("正文"))
                .andExpect(jsonPath("data.tags", hasSize(2)))
                .andExpect(jsonPath("data.tags[*].name",
                        Matchers.containsInAnyOrder("算法", "随笔"))).andReturn();

        Integer postId =
                JsonPath.parse(postResult.getResponse().getContentAsString()).read("data.id");

        myGet("/posts/" + postId).andExpect(status().isOk())
                .andExpect(jsonPath("data.name")
                        .value("标题"))
                .andExpect(jsonPath("data.content").value("正文"))
                .andExpect(jsonPath("data.tags", hasSize(2)))
                .andExpect(jsonPath("data.tags[*].name",
                        Matchers.containsInAnyOrder("算法", "随笔"))).andReturn();

        PostPayload updatePost = PostPayload.builder().name("标题2").content(
                "正文2").tags(tags).build();
        myPut("/posts" + postId, updatePost).andExpect(status().isOk());
    }


}
