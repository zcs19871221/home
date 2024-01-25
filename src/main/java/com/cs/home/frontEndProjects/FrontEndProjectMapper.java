package com.cs.home.frontEndProjects;

import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@org.mapstruct.Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface Mapper {

    FrontProject mapping(CreatePayload seCreatePayload);

    FrontProject mapping(SeUpdatePayload seUpdatePayload);


    void updateSe(@MappingTarget FrontProject dist, FrontProject src);

    Response mapping(FrontProject se);

    List<Response> mapping(List<FrontProject> seList);

}

