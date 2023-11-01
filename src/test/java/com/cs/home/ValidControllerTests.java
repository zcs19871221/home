package com.cs.home;

import com.cs.home.validate.ValidateController;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ValidateController.class)
class ValidControllerTests   {

	protected static final ObjectMapper objectMapper = new ObjectMapper();

	@Autowired
	protected MockMvc mockMvc;

	@Test
	void shouldReturnSuccessMessage() throws Exception {
		Map<String, String> body = new HashMap<>();
		body.put("name", "zcs");
		mockMvc.perform(post("/validate")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(body)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("data")
				.value("valid params: zcs"));
	}

}
