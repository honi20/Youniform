package com.youniform.api.domain.user.service;

import com.youniform.api.domain.user.dto.LocalSigninReq;
import com.youniform.api.domain.user.dto.SignupReq;
import com.youniform.api.domain.user.entity.Users;

public interface UserService {
    String signin(LocalSigninReq user) throws Exception;

    String signup(SignupReq user) throws Exception;
}
