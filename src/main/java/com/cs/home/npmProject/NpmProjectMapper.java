package com.cs.home.npmProject;


import com.cs.home.nodeServer.NodeServer;
import com.cs.home.nodeServer.NodeServerResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(nullValuePropertyMappingStrategy =
        NullValuePropertyMappingStrategy.IGNORE)
public interface NpmProjectMapper {

    @Mapping(target = "npmProject", source = "npmProject", ignore = true)
    NodeServerResponse map(NodeServer nodeServer);

    NpmProject map(NpmProjectCreated npmProjectCreated);

    NpmProject map(NpmProjectUpdated npmProjectUpdated);

    void updateNpmProject(@MappingTarget NpmProject dist, NpmProject src);

    NpmProjectResponse map(NpmProject npmProject);


}

