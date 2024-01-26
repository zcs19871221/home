package com.cs.home.NpmProjects;


import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.nio.file.Path;
import java.util.List;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface NpmProjectMapper {

    NpmProject map(NpmProjectCreated npmProjectCreated);


    default String pathToString(Path path) {
        return path.normalize().toString();
    }

    NpmProject map(NpmProjectUpdated npmProjectUpdated);


    void updateNpmProject(@MappingTarget NpmProject dist, NpmProject src);

    NpmProjectResponse map(NpmProject npmProject);

    List<NpmProjectResponse> map(List<NpmProject> npmProjects);

}

