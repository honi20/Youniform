package com.youniform.api.global.oauth.userInfo;

import java.util.Map;

public class NaverUserInfo implements Oauth2UserInfo {

    private Map<String, Object> attributes; //getAttributes()

    public NaverUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }
    @Override
    public String getProviderId() {
        return (String)attributes.get("id");
    }

    @Override
    public String getProvider() {
        return "naver";
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getName() {
        if(attributes.get("name") == null){
            return "youniform_" + (System.currentTimeMillis()/1000);
        }
        return (String) attributes.get("name");
    }

    @Override
    public String getProfileUrl() {
        return (String) attributes.get("profile_image");
    }
}