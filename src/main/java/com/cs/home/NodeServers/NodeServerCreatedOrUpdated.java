package com.cs.home.NodeServers;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Data
public class NodeServerCreatedOrUpdated {

    private Integer id;

    @NotEmpty
    private String command;

    @NotEmpty
    private String name;

    private Set<NodeServerCreatedOrUpdated> postServers;

    @NotNull
    private Integer npmProjectId;

    @NotEmpty
    private String portConfigFileRelativePath;

    //    @JsonDeserialize(using = CustomRegExpDeserializer.class)
    private String portReg;

//    @JsonSetter
//    public void setPortReg(String portReg) {
//        this.portReg = Pattern.compile(URLDecoder.decode(portReg,
//                StandardCharsets.UTF_8));
//    }


}
