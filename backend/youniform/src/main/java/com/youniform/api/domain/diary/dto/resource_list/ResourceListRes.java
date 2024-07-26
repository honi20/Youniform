package com.youniform.api.domain.diary.dto.resource_list;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResourceListRes {
    private List<ResourceDto> resources;

    private List<StampDto> stamps;
}
