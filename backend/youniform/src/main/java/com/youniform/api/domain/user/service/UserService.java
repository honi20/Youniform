package com.youniform.api.domain.user.service;

import com.youniform.api.domain.user.dto.AlertModifyReq;
import com.youniform.api.domain.user.dto.LocalSigninReq;
import com.youniform.api.domain.user.dto.SignupReq;
import com.youniform.api.domain.user.dto.ThemeModifyReq;
import com.youniform.api.domain.user.dto.*;
import com.youniform.api.domain.user.entity.Users;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {
    void resignUser(Long userId);

    String signin(LocalSigninReq user);

    String signup(SignupReq user);

    void modifyAlert(AlertModifyReq req, Long userId);

    void modifyTheme(ThemeModifyReq req, Long userId);

    ProfileModifyRes modifyProfile(ProfileModifyReq req, MultipartFile file, Long userId) throws IOException;

    UserDetailsRes findUserDetails(Long myUserId, String uuid) throws Exception;

    MyDetailsRes findMyDetails(Long userId);

    void passwordReset(PasswordResetReq req);

    void modifyPassword(PasswordModifyReq req, Long userId);

    void passwordResetSend(PasswordResetSendReq req);
}
