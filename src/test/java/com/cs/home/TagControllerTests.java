package com.cs.home;

import com.cs.home.tag.TagController;
import com.cs.home.validate.ValidateController;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
//@ActiveProfiles("test")
class TagControllerTests {

	protected static final ObjectMapper objectMapper = new ObjectMapper();


	@Autowired
	protected MockMvc mockMvc;

	@Test
	void shouldReturnSuccessMessage() throws Exception {
		Map<String, String> body = new HashMap<>();
		body.put("name", "算法22222");
		mockMvc.perform(post("/tag")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(body)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("data")
				.value("valid params: zcs"));
	}

}
