package com.cs.home.appProcess;

import com.cs.home.project.Project;
import com.cs.home.project.ProjectResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.Map;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AppProcessMapper {
    @Mapping(target = "appProcesses", source = "appProcesses", ignore = true)
    ProjectResponse map(Project project);

    AppProcess map(AppProcessUpdated processUpdated);

    AppProcess map(AppProcessCreated processCreated);

    AppProcessResponse map(AppProcess appProcess);

    void merge(@MappingTarget AppProcess target, AppProcess source);

    Map<Integer, RunningProcessResponse> map(Map<Integer, RunningProcess> idMapProcess);


}
