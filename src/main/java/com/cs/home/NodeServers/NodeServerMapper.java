package com.cs.home.NodeServers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.regex.Pattern;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface NodeServerMapper {

    @Mapping(target = "npmProject", source = "npmProjectId", ignore = true)
    @Mapping(target = "children", source = "children", ignore = true)
    NodeServer map(NodeServerCreatedOrUpdated nodeServerCreatedOrUpdated);

    @Mapping(target = "npmProjectId", source = "npmProject", ignore = true)
    @Mapping(target = "children", source = "children", ignore = true)
    NodeServerResponse map(NodeServer nodeServer);

    default String map(Pattern portReg) {
        return portReg.toString();
    }

    default Pattern map(String portReg) {
        return Pattern.compile(portReg);
    }


}
