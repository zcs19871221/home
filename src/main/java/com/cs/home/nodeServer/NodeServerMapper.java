package com.cs.home.nodeServer;

import com.cs.home.npmProject.NpmProject;
import com.cs.home.npmProject.NpmProjectResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.Map;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface NodeServerMapper {
    @Mapping(target = "nodeServers", source = "nodeServers", ignore = true)
    NpmProjectResponse map(NpmProject npmProject);

    NodeServer map(NodeServerUpdated nodeServerUpdated);

    NodeServer map(NodeServerCreated nodeServerCreated);

    NodeServerResponse map(NodeServer nodeServer);

    Map<Integer, NodeServerRunningInfo> map(Map<Integer, ProcessInfo> nodeServer);

    void merge(@MappingTarget NodeServer target, NodeServer source);

}
