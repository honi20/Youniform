package com.youniform.api.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class SearchNicknameRes {
    private List<SearchUserDto> userList;

    public static SearchNicknameRes toDto(List<SearchUserDto> userList) {
        return SearchNicknameRes.builder()
                .userList(userList)
                .build();
    }
}
