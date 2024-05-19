package com.catale.backend.global.exception.email;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class InvalidAuthCodeException extends RuntimeException {

    private final ErrorCode errorCode;

    public InvalidAuthCodeException() {
        this.errorCode = ErrorCode.AUTH_CODE_INVALID;
    }
}
