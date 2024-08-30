package com.cs.home.appProcessStatus;

import com.cs.home.appProcesses.AppProcess;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Data
public class AppProcessStatusCreated {
    @NotEmpty
    private String matcher;

    @NotEmpty
    private String name;

    @NotEmpty
    private String color;

}
