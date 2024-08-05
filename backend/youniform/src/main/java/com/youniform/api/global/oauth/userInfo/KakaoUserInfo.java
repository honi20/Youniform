package com.youniform.api.global.oauth.userInfo;

import java.util.LinkedHashMap;
import java.util.Map;

public class KakaoUserInfo implements Oauth2UserInfo {

    private Map<String, Object> attributes; //getAttributes()

    public KakaoUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }
    @Override
    public String getProviderId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getName() {
        return ((LinkedHashMap)attributes.get("properties")).get("nickname").toString();
    }

    @Override
    public String getProfileUrl() {
        return ((LinkedHashMap)attributes.get("properties")).get("profile_image").toString();
    }
}