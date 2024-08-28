package com.cs.home.project;


import com.cs.home.appProcess.AppProcess;
import com.cs.home.appProcess.AppProcessResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(nullValuePropertyMappingStrategy =
        NullValuePropertyMappingStrategy.IGNORE)
public interface ProjectMapper {

    @Mapping(target = "project", source = "project", ignore = true)
    AppProcessResponse map(AppProcess appProcess);

    Project map(ProjectCreated npmProjectCreated);

    Project map(ProjectUpdated npmProjectUpdated);

    void updateNpmProject(@MappingTarget Project dist, Project src);

    com.cs.home.project.ProjectResponse map(Project npmProject);


}

