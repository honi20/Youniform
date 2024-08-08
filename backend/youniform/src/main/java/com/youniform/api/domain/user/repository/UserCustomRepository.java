package com.youniform.api.domain.user.repository;

import com.youniform.api.domain.user.dto.SearchUserDto;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface UserCustomRepository {
    Slice<SearchUserDto> findUserByCursor(@Param("userId") Long userId,
                                          @Param("lastUserId") Long lastUserId,
                                          @Param("pageable") Pageable pageable);

}
