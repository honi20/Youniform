package com.youniform.api.domain.user.service;

import com.youniform.api.domain.user.dto.AlertModifyReq;
import com.youniform.api.domain.user.dto.LocalSigninReq;
import com.youniform.api.domain.user.dto.SignupReq;
import com.youniform.api.domain.user.entity.Users;

public interface UserService {
    void resignUser(Long userId);

    String signin(LocalSigninReq user);

    String signup(SignupReq user);

    void modifyAlert(AlertModifyReq req, Long userId);
}
