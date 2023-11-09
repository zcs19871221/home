package com.cs.home;

import com.cs.home.post.PostPayload;
import com.cs.home.tag.TagPayload;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.jdbc.JdbcTestUtils;
import org.springframework.test.web.servlet.MvcResult;

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
    void shouldCreatePostSuccessful() throws Exception {
        TagPayload tagPayload = TagTests.create();

        MvcResult result = myPost("/tags", tagPayload)
                .andExpect(status().isOk()).andExpect(jsonPath("data.id").isNumber()).andReturn();

        String response = result.getResponse().getContentAsString();
        Integer tagId = JsonPath.parse(response).read("data.id");

        Set<Integer> tags = new HashSet<>();
        tags.add(tagId);
        PostPayload postPayload = PostPayload.builder().name("标题").content(
                "正文").tags(tags).build();

        myPost("/api/posts", postPayload)
                .andExpect(status().isOk())
                .andExpect(jsonPath("data.name")
                        .value("标题"))
                .andExpect(jsonPath("data.content").value("正文"))
                .andExpect(jsonPath("data.tags", hasSize(1)))
                .andExpect(jsonPath("data.tags[0].name").value("算法"));
    }


}
