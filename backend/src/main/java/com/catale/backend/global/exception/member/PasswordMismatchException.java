package com.catale.backend.global.exception.member;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class PasswordMismatchException extends RuntimeException {

    private final ErrorCode errorCode;

    public PasswordMismatchException() {
        this.errorCode = ErrorCode.PASSWORD_MISMATCH;
    }
}
