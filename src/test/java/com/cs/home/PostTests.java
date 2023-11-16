package com.cs.home;

import com.cs.home.post.PostPayload;
import com.cs.home.tag.TagPayload;
import com.jayway.jsonpath.JsonPath;
import com.mysema.commons.lang.Assert;
import net.minidev.json.JSONArray;
import org.hamcrest.core.IsNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashSet;
import java.util.Set;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class PostTests extends TagTests {

    @PersistenceContext
    @Autowired
    private EntityManager em;

    @Test
    @Transactional
    void shouldCreateSuccessful() throws Exception {

        TagPayload tagPayload1 = createTag("算法");
        TagPayload tagPayload2 = createTag("随笔");
        Integer tagId1 = insertTagAndReturnId(tagPayload1);
        Integer tagId2 = insertTagAndReturnId(tagPayload2);
        Set<Integer> tags = new HashSet<>();
        tags.add(tagId1);
        tags.add(tagId2);
        PostPayload postPayload = createPost("标题", "正文", tags);
        String response = insertPost(postPayload)
                .andExpect(jsonPath("data.name").value("标题"))
                .andExpect(jsonPath("data.content").value("正文")).andExpect(jsonPath("data.tags", hasSize(2))).andReturn().getResponse().getContentAsString();
        Integer postId = JsonPath.parse(response).read("data.id");
        var post = new HashSet<Integer>();
        post.add(postId);
        em.flush();
        em.clear();
        validPostsInTag(tagId1, post);
        validPostsInTag(tagId2, post);

    }

    @Test
    @Transactional
    void shouldUpdateSuccessful() throws Exception {

        PostPayload postPayload = createPost("标题", "正文", new HashSet<>());
        Integer id = insertPostAndReturnId(postPayload);
        TagPayload tagPayload = createTag("随笔");
        Integer tagId = insertTagAndReturnId(tagPayload);
        Set<Integer> tags = new HashSet<>();
        tags.add(tagId);
        myPut("/posts/" + id, createPost("标题2", "正文2", tags)).andExpect(status().isOk()).andExpect(jsonPath("data.name").value("标题2")).andExpect(jsonPath("data.content").value("正文2"));
    }

    @Test
    @Transactional
    void shouldDeleteSuccessful() throws Exception {

        int[] ids = createPost();
        int postId = ids[0];
        int tagId = ids[1];

        myDelete("/posts/" + postId).andExpect(status().isOk());

        em.flush();
        em.clear();
        myGet("/posts/" + postId).andExpect(status().isOk()).andExpect(jsonPath(
                "data").value(IsNull.nullValue()));
        validPostsInTag(tagId, new HashSet<>());
    }

    @Test
    @Transactional
    void shouldDeleteAndTagCorrect() throws Exception {

        int[] ids = createPost();
        int postId = ids[0];
        int tagId = ids[1];

        myDelete("/tags/" + tagId).andExpect(status().isOk());

        em.flush();
        em.clear();
        myGet("/tags/" + tagId).andExpect(status().isOk()).andExpect(jsonPath(
                "data").value(IsNull.nullValue()));
        String postResponse =
                myGet("/posts/" + postId).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
        JSONArray tags = JsonPath.parse(postResponse).read(
                "data" +
                        ".tags");
        Assert.isTrue(tags.isEmpty(), "empty");
    }

    private int[] createPost() throws Exception {
        TagPayload tagPayload = createTag("随笔");
        Integer tagId = insertTagAndReturnId(tagPayload);
        Set<Integer> tags = new HashSet<>();
        tags.add(tagId);

        PostPayload postPayload = createPost("标题", "正文", tags);
        Integer id = insertPostAndReturnId(postPayload);
        return new int[]{id, tagId};
    }

    private Integer insertPostAndReturnId(PostPayload postPayload) throws Exception {
        String response = insertPost(postPayload).andReturn().getResponse().getContentAsString();
        return JsonPath.parse(response).read("data.id");
    }

    private ResultActions insertPost(PostPayload postPayload) throws Exception {
        return myPost("/posts", postPayload)
                .andExpect(status().isOk());
    }

    private PostPayload createPost(String name, String content,
                                   Set<Integer> tags) {
        return PostPayload.builder()
                .name(name)
                .content(content)
                .tags(tags).build();
    }


}
