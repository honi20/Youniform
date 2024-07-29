package com.youniform.api.domain.user.role;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {
    ROLE_USER,
    ROLE_ADMIN,
    ;

    @Override
    public String getAuthority() {
        return ROLE_USER.name();
    }
}
