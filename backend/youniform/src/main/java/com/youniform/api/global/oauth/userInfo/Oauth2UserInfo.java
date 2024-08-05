package com.youniform.api.global.oauth.userInfo;

public interface Oauth2UserInfo {
    String getProviderId();
    String getProvider();
    String getEmail();
    String getName();
    String getProfileUrl();
}
