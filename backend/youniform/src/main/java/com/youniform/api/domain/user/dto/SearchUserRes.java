package com.youniform.api.domain.user.dto;

import com.youniform.api.global.dto.SliceDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchUserRes {
    private SliceDto<SearchUserDto> userList;

    public static SearchUserRes toDto(SliceDto<SearchUserDto> userList) {
        return SearchUserRes.builder()
                .userList(userList)
                .build();
    }
}
