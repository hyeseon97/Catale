package com.catale.backend.global.exception.member;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class InvalidPasswordException extends RuntimeException {

    private final ErrorCode errorCode;

    public InvalidPasswordException() {
        this.errorCode = ErrorCode.PASSWORD_MISMATCH;
    }
}
