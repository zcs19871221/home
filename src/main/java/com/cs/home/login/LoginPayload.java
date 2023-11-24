package com.cs.home.login;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class LoginPayload {
    @NotEmpty
    private String userName;

    @NotEmpty
    private String password;
}
