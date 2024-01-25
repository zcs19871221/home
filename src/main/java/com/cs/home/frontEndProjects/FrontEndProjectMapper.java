package com.cs.home.frontEndProjects;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.nio.file.Path;
import java.util.List;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface FrontEndProjectMapper {

    FrontEndProject mapping(CreateFrontEndProjectPayload seCreatePayload);


    default String pathToString(Path path) {
        return path.normalize().toString();
    }

    FrontEndProject mapping(UpdateFrontEndProjectPayload seUpdatePayload);


    void updateFrontEndProject(@MappingTarget FrontEndProject dist, FrontEndProject src);

    FrontEndProjectResponse mapping(FrontEndProject se);

    List<FrontEndProjectResponse> mapping(List<FrontEndProject> seList);

}

