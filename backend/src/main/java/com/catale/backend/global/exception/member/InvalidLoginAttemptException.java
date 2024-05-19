package com.catale.backend.global.exception.member;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class InvalidLoginAttemptException extends RuntimeException {

    private final ErrorCode errorCode;

    public InvalidLoginAttemptException() {
        this.errorCode = ErrorCode.LOGIN_FAILED;
    }
}
