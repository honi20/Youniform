package com.youniform.api.domain.user.dto;

import com.youniform.api.global.dto.SliceDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchUserRes {
    private SliceDto<SearchUserDto> userList;

    public static SearchUserRes toDto(SliceDto<SearchUserDto> userList) {
        return SearchUserRes.builder()
                .userList(userList)
                .build();
    }
}
