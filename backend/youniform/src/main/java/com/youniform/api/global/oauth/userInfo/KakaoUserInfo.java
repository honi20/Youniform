package com.youniform.api.global.oauth.userInfo;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

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
        return (String) ((Map<String, Object>)attributes.get("kakao_account")).get("email");
    }

    @Override
    public String getName() {
        return Optional.ofNullable((LinkedHashMap) attributes.get("properties"))
                .map(properties -> properties.get("nickname"))
                .map(Object::toString)
                .orElse("youniform_" + (System.currentTimeMillis()/1000));
    }


    @Override
    public String getProfileUrl() {
        return ((LinkedHashMap)attributes.get("properties")).get("profile_image").toString();
    }
}