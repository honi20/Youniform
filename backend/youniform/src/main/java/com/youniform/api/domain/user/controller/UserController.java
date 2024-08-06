package com.youniform.api.domain.user.controller;

import com.youniform.api.domain.user.dto.*;
import com.youniform.api.domain.user.service.UserService;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.statuscode.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static com.youniform.api.domain.user.entity.Theme.MONSTERS;
import static com.youniform.api.global.statuscode.ErrorCode.*;
import static com.youniform.api.global.statuscode.SuccessCode.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Validated
public class UserController {
    private final UserService userService;

    @GetMapping("/verify")
    public ResponseEntity<?> nicknameCheck(@RequestParam("nickname") String nickname) {
        return new ResponseEntity<>(ResponseDto.success(USER_NICKNAME_OK, null), HttpStatus.OK);
    }

    @PostMapping("/email/send")
    public ResponseEntity<?> emailSend(@RequestBody EmailSendReq emailSendReq) {
        return new ResponseEntity<>(ResponseDto.success(VERIFY_CODE_SEND, null), HttpStatus.OK);
    }

    @GetMapping("/email/verify")
    public ResponseEntity<?> emailVerify(@ModelAttribute EmailVerifyReq emailVerifyReq) {
        return new ResponseEntity<>(ResponseDto.success(EMAIL_VERIFIED, null), HttpStatus.OK);
    }

    @PostMapping("/password/send")
    public ResponseEntity<?> passwordResetSend(@RequestBody PasswordResetSendReq passwordResetSendReq) {
        return new ResponseEntity<>(ResponseDto.success(PASSWORD_RESET_EMAIL_SEND, null), HttpStatus.OK);
    }

    @PatchMapping("/password/reset")
    public ResponseEntity<?> passwordReset(@RequestBody PasswordResetReq passwordResetReq) {
        return new ResponseEntity<>(ResponseDto.success(PASSWORD_MODIFIED, null), HttpStatus.OK);
    }

    @PatchMapping("/password")
    public ResponseEntity<?> passwordModify(@RequestBody PasswordModifyReq passwordModifyReq) {
        return new ResponseEntity<>(ResponseDto.success(PASSWORD_MODIFIED, null), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> myDetails() {
        MyDetailsRes result = MyDetailsRes.builder()
                .nickname("bebebe")
                .introduce("기아 짱팬")
                .profileUrl("S3 URL")
                .theme(MONSTERS)
                .pushAlert(true)
                .teamImage("team S3 URL")
                .build();

        return new ResponseEntity<>(ResponseDto.success(USER_DETAILS_OK, result), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> userDetails(@PathVariable("userId") String userId) {
        UserDetailsRes result = UserDetailsRes.builder()
                .userId("dsf394dsf0sd9fs")
                .nickname("bebebe")
                .introduce("기아 짱팬")
                .profileUrl("S3 URL")
                .teamImage("team S3 URL")
                .build();

        return new ResponseEntity<>(ResponseDto.success(USER_DETAILS_OK, result), HttpStatus.OK);
    }

    @PatchMapping("/profile")
    public ResponseEntity<?> profileModify(
            @RequestPart(value = "dto") ProfileModifyReq profileModifyReq,
            @RequestPart(value = "file") MultipartFile file) {
        ProfileModifyRes result = ProfileModifyRes.builder()
                .nickname("수정된 닉네임")
                .introduce("수정된 자기소개")
                .profileUrl("수정된 프로필 사진 URL")
                .build();

        return new ResponseEntity<>(ResponseDto.success(PROFILE_MODIFIED, result), HttpStatus.OK);
    }

    @PatchMapping("/profile/theme")
    public ResponseEntity<?> themeModify(@RequestBody ThemeModifyReq themeModifyReq) {
        return new ResponseEntity<>(ResponseDto.success(THEME_MODIFIED, null), HttpStatus.OK);
    }

    @PatchMapping("/profile/alert")
    public ResponseEntity<?> alertModify(@RequestBody AlertModifyReq alertModifyReq, Authentication authentication) {
        userService.modifyAlert(alertModifyReq, (Long) authentication.getPrincipal());
        return new ResponseEntity<>(ResponseDto.success(ALERT_MODIFIED, null), HttpStatus.OK);
    }

    @PatchMapping("/resign")
    public ResponseEntity<?> userResign(Authentication authentication) {
        userService.resignUser((Long) authentication.getPrincipal());
        return new ResponseEntity<>(ResponseDto.success(USER_RESIGNED, null), HttpStatus.OK);
    }

    @PostMapping("/signup/{provider}")
    public ResponseEntity<?> userSignup(@PathVariable("provider") String provider, @RequestBody SignupReq user) {
        try {
            String accessToken = userService.signup(user);
            SignupRes result = SignupRes.builder().accessToken(accessToken).build();
            return new ResponseEntity<>(ResponseDto.success(USER_SIGNUP_SUCCESS, result), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(ResponseDto.fail(INVALID_SIGNUP), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/signin/local")
    public ResponseEntity<?> signin(@RequestBody LocalSigninReq user){
        try {
            String accessToken = userService.signin(user);
            SigninRes result = SigninRes.builder().accessToken(accessToken).build();
            return new ResponseEntity<>(ResponseDto.success(USER_SIGNIN_SUCCESS, result), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(ResponseDto.fail(USER_NOT_FOUND), HttpStatus.NOT_FOUND);
        }
    }
}