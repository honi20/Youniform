package com.youniform.api.domain.user.service;

import com.youniform.api.domain.user.dto.LocalSigninReq;
import com.youniform.api.domain.user.dto.SignupReq;
import com.youniform.api.domain.user.entity.Users;

public interface UserService {
    Users findByEmail(String email);

    String signin(LocalSigninReq user);

    String signup(SignupReq user);

    Long findById(Long id);
}
