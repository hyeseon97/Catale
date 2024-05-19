package com.catale.backend.global.exception.member;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class DuplicateEmailException extends RuntimeException {

    private final ErrorCode errorCode;

    public DuplicateEmailException() {
        this.errorCode = ErrorCode.EMAIL_DUPLICATED;
    }
}
