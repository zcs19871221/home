package com.cs.home;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.DelegatingAuthenticationEntryPoint;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.LinkedHashMap;

@SpringBootApplication
@EntityScan
@EnableSwagger2
@EnableJpaAuditing
public class HomeApplication {

    public static void main(String[] args) {
        SpringApplication.run(HomeApplication.class, args);
    }

    @Bean("authenticationEntryPoint")
    public AuthenticationEntryPoint customEntryPoint() {

        LinkedHashMap<RequestMatcher, AuthenticationEntryPoint> entryPoints =
                new LinkedHashMap<>();
        entryPoints.put(new RegexRequestMatcher("api", "GET"),
                new Http403ForbiddenEntryPoint());

        DelegatingAuthenticationEntryPoint entryPoint =
                new DelegatingAuthenticationEntryPoint(entryPoints);
        entryPoint.setDefaultEntryPoint(new LoginUrlAuthenticationEntryPoint(
                "/login"));
        return entryPoint;
    }


}
