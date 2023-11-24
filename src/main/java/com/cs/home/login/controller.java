package com.cs.home.login;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.constraints.NotEmpty;


@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping("/login")
public class controller {
    private final AuthenticationManager authenticationManager;

    @GetMapping(produces = "text/html")
    public String login() {
        return "login";
    }

    @PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public String login(Model model, @RequestParam @NotEmpty String username,
                        @RequestParam @NotEmpty String password) {
        Authentication authenticationRequest =
                UsernamePasswordAuthenticationToken.unauthenticated(username, password);

        try {
            Authentication authenticationResponse =
                    this.authenticationManager.authenticate(authenticationRequest);
            model.addAttribute("successMessage", "认证成功");
        } catch (Exception ex) {
            model.addAttribute("username", username);
            model.addAttribute("password", password);
            model.addAttribute("errorMessage", ex.getLocalizedMessage());
        }
        return "login";
    }

}
