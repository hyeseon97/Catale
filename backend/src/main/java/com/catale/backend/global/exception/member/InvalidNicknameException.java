package com.catale.backend.global.exception.member;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class InvalidNicknameException extends RuntimeException {

    private final ErrorCode errorCode;

    public InvalidNicknameException() {
        this.errorCode = ErrorCode.INVALID_NICKNAME;
    }
}
