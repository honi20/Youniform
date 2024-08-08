package com.youniform.api.domain.user.controller;

import com.youniform.api.domain.user.dto.*;
import com.youniform.api.domain.user.service.UserService;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static com.youniform.api.global.statuscode.SuccessCode.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Validated
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;

    @GetMapping("/verify")
    public ResponseEntity<?> nicknameCheck(@RequestParam("nickname") String nickname) {
        userService.verifyNickname(nickname);
        return new ResponseEntity<>(ResponseDto.success(USER_NICKNAME_OK, true), HttpStatus.OK);
    }

    @PostMapping("/email/send")
    public ResponseEntity<?> emailSend(@RequestBody EmailSendReq emailSendReq) {
        userService.sendEmail(emailSendReq);
        return new ResponseEntity<>(ResponseDto.success(VERIFY_CODE_SEND, null), HttpStatus.OK);
    }

    @GetMapping("/email/verify")
    public ResponseEntity<?> emailVerify(@ModelAttribute EmailVerifyReq emailVerifyReq) {
        userService.verifyEmail(emailVerifyReq);
        return new ResponseEntity<>(ResponseDto.success(EMAIL_VERIFIED, null), HttpStatus.OK);
    }

    @PostMapping("/password/send")
    public ResponseEntity<?> passwordResetSend(@RequestBody PasswordResetSendReq passwordResetSendReq) {
        userService.passwordResetSend(passwordResetSendReq);
        return new ResponseEntity<>(ResponseDto.success(PASSWORD_RESET_EMAIL_SEND, null), HttpStatus.OK);
    }

    @PatchMapping("/password/reset")
    public ResponseEntity<?> passwordReset(@RequestBody PasswordResetReq passwordResetReq) {
        userService.passwordReset(passwordResetReq);
        return new ResponseEntity<>(ResponseDto.success(PASSWORD_MODIFIED, null), HttpStatus.OK);
    }

    @PatchMapping("/password")
    public ResponseEntity<?> passwordModify(@RequestBody PasswordModifyReq passwordModifyReq) {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());
        userService.modifyPassword(passwordModifyReq, userId);
        return new ResponseEntity<>(ResponseDto.success(PASSWORD_MODIFIED, null), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> myDetails() {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());
        MyDetailsRes result = userService.findMyDetails(userId);
        return new ResponseEntity<>(ResponseDto.success(USER_DETAILS_OK, result),
                HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> userDetails(@PathVariable("userId") String userId) throws Exception {
        Long myUserId = jwtService.getUserId(SecurityContextHolder.getContext());
        UserDetailsRes result = userService.findUserDetails(myUserId, userId);
        return new ResponseEntity<>(ResponseDto.success(USER_DETAILS_OK, result),
                HttpStatus.OK);
    }

    @PatchMapping("/profile")
    public ResponseEntity<?> profileModify(
            @RequestPart(value = "dto") ProfileModifyReq profileModifyReq,
            @RequestPart(value = "file", required = false) MultipartFile file) throws Exception {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());
        ProfileModifyRes result = userService.modifyProfile(profileModifyReq, file, userId);
        return new ResponseEntity<>(ResponseDto.success(PROFILE_MODIFIED, result), HttpStatus.OK);
    }

    @PatchMapping("/profile/theme")
    public ResponseEntity<?> themeModify(@RequestBody ThemeModifyReq themeModifyReq) {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());
        userService.modifyTheme(themeModifyReq, userId);
        return new ResponseEntity<>(ResponseDto.success(THEME_MODIFIED, null), HttpStatus.OK);
    }

    @PatchMapping("/profile/alert")
    public ResponseEntity<?> alertModify(@RequestBody AlertModifyReq alertModifyReq) {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());
        userService.modifyAlert(alertModifyReq, userId);
        return new ResponseEntity<>(ResponseDto.success(ALERT_MODIFIED, null), HttpStatus.OK);
    }

    @PatchMapping("/resign")
    public ResponseEntity<?> userResign() {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());
        userService.resignUser(userId);
        return new ResponseEntity<>(ResponseDto.success(USER_RESIGNED, null), HttpStatus.OK);
    }

    @PostMapping("/signup/{provider}")
    public ResponseEntity<?> userSignup(@PathVariable("provider") String provider, @RequestBody SignupReq user) {
        String accessToken = userService.signup(user);
        SignupRes result = SignupRes.builder().accessToken(accessToken).build();
        return new ResponseEntity<>(ResponseDto.success(USER_SIGNUP_SUCCESS, result), HttpStatus.OK);
    }

    @PostMapping("/signin/local")
    public ResponseEntity<?> signin(@RequestBody LocalSigninReq user){
        String accessToken = userService.signin(user);
        SigninRes result = SigninRes.builder().accessToken(accessToken).build();
        return new ResponseEntity<>(ResponseDto.success(USER_SIGNIN_SUCCESS, result), HttpStatus.OK);
    }

    @GetMapping("/lists")
    public ResponseEntity<?> searchUserList(@RequestParam(value = "lastUserId", required = false) Long lastUserId,
                                            @PageableDefault(size = 20) Pageable pageable) {
        Long userId = 123L;

        SearchUserRes result = userService.searchUser(userId, lastUserId, pageable);

        return new ResponseEntity<>(ResponseDto.success(USER_RECOMMEND_SUCCESS, result), HttpStatus.OK);
    }

    @PatchMapping("/favorite")
    public ResponseEntity<?> userFavoriteModify(@RequestBody UserFavoriteReq userFavoriteReq) {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());
        userService.modifyUserFavorite(userId, userFavoriteReq);
        return new ResponseEntity<>(ResponseDto.success(USER_FAVORITE_MODIFIED, null), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchNickname(@RequestParam("nickname") String nickname) {
        Long userId = jwtService.getUserId(SecurityContextHolder.getContext());

        SearchNicknameRes result = userService.findUserByNickName(nickname);

        return new ResponseEntity<>(ResponseDto.success(USER_SEARCH_OK, result), HttpStatus.OK);
    }
}