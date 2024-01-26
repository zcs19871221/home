package com.cs.home.NodeServers;

import com.cs.home.common.StringToPattern;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.Set;

@Data
public class NodeServerCreated {

    @NotEmpty
    private String command;

    private Set<Integer> dependentNodeServers;

    @NotNull
    private Integer npmProjectId;

    @NotEmpty
    private String portConfigFileRelativePath;

    @NotEmpty
    @StringToPattern
    private Pattern portReg;

}
