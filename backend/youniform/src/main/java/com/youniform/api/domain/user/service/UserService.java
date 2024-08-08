package com.youniform.api.domain.user.service;

import com.youniform.api.domain.user.dto.*;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {
    void resignUser(Long userId);

    String signin(LocalSigninReq user);

    String signup(SignupReq user);

    void modifyAlert(AlertModifyReq req, Long userId);

    void modifyTheme(ThemeModifyReq req, Long userId);

    ProfileModifyRes modifyProfile(ProfileModifyReq req, MultipartFile file, Long userId) throws Exception;

    void verifyNickname(String nickname);

    UserDetailsRes findUserDetails(Long myUserId, String uuid) throws Exception;

    MyDetailsRes findMyDetails(Long userId);

    void passwordReset(PasswordResetReq req);

    void modifyPassword(PasswordModifyReq req, Long userId);

    void passwordResetSend(PasswordResetSendReq req);

    SearchUserRes searchUser(Long userId, Long lastUserId, Pageable pageable);

    void modifyUserFavorite(Long userId, UserFavoriteReq userFavoriteReq);

    void sendEmail(EmailSendReq req);

    void verifyEmail(EmailVerifyReq req);
}
