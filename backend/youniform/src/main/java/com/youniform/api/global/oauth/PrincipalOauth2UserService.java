package com.youniform.api.global.oauth;

import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.global.oauth.userInfo.GoogleUserInfo;
import com.youniform.api.global.oauth.userInfo.KakaoUserInfo;
import com.youniform.api.global.oauth.userInfo.NaverUserInfo;
import com.youniform.api.global.oauth.userInfo.Oauth2UserInfo;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        Oauth2UserInfo oAuth2UserInfo = null;

        if(userRequest.getClientRegistration().getRegistrationId().equals("google")){
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        } else if(userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            oAuth2UserInfo = new NaverUserInfo((Map)oAuth2User.getAttributes().get("response"));
        } else if(userRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
            oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
        } else {
            return oAuth2User;
        }

        String provider = oAuth2UserInfo.getProvider();
        String username = oAuth2UserInfo.getName(); //+"_"+provider+"_"+providerId;
        String email = oAuth2UserInfo.getEmail();
        String profileUrl = oAuth2UserInfo.getProfileUrl();
        String role = "ROLE_USER";

        Users userEntity = Users.builder()
                .nickname(username)
                .email(email)
                .providerType(provider)
                .profileUrl(profileUrl)
                .build();

        return new PrincipalDetails(userEntity, oAuth2User.getAttributes());
    }
}