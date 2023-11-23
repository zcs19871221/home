package com.cs.home.login;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RequiredArgsConstructor
@RequestMapping("/login")
@Controller
public class controller {
    private final AuthenticationManager authenticationManager;

    @PostMapping
    @ResponseBody
    public ResponseEntity<Void> login(@RequestBody LoginRequest loginRequest) {
        Authentication authenticationRequest =
                UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.username(), loginRequest.password());
        Authentication authenticationResponse =
                this.authenticationManager.authenticate(authenticationRequest);
        return null;
    }

    @GetMapping
    public String loginPage() {
        return "login.html";
    }

    public record LoginRequest(String username, String password) {
    }
}
