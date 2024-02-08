package com.cs.home.NpmProjects;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.nio.file.Path;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface NpmProjectMapper {

    NpmProject map(NpmProjectCreated npmProjectCreated);


    default String pathToString(Path path) {
        return path.normalize().toString();
    }

    NpmProject map(NpmProjectUpdated npmProjectUpdated);


    void updateNpmProject(@MappingTarget NpmProject dist, NpmProject src);

    @Mapping(target = "nodeServers", source = "nodeServers", ignore = true)
    NpmProjectResponse map(NpmProject npmProject);


}

