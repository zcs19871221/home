package com.cs.home.NodeServers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.Map;
import java.util.regex.Pattern;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface NodeServerMapper {

    @Mapping(target = "npmProject", source = "npmProjectId", ignore = true)
    @Mapping(target = "postServers", source = "postServers", ignore = true)
    NodeServer map(NodeServerCreatedOrUpdated nodeServerCreatedOrUpdated);

    @Mapping(target = "npmProjectId", source = "npmProject", ignore = true)
    NodeServerResponse map(NodeServer nodeServer);

    @Mapping(target = "npmProjectId", source = "npmProject", ignore = true)
    Map<Integer, NodeServerRunningInfo> map(Map<Integer, ProcessInfo> nodeServer);

    void merge(NodeServer source, @MappingTarget NodeServer target);

    default String map(Pattern portReg) {
        return portReg.toString();
    }

    default Pattern map(String portReg) {
        return Pattern.compile(portReg);
    }


}
