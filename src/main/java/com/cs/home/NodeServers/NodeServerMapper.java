package com.cs.home.NodeServers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface NodeServerMapper {
    NodeServer map(NodeServerCreated nodeServerCreated);

    NodeServerResponse map(NodeServer nodeServer);

    void merge(@MappingTarget NodeServer target, NodeServerUpdated src);
}
