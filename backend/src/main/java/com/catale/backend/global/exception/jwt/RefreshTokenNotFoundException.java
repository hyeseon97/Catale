package com.catale.backend.global.exception.jwt;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class RefreshTokenNotFoundException extends RuntimeException {

    private final ErrorCode errorCode;

    public RefreshTokenNotFoundException() {
        this.errorCode = ErrorCode.REFRESH_TOKEN_NOT_FOUND;
    }
}
