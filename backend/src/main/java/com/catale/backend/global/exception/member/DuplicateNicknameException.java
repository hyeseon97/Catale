package com.catale.backend.global.exception.member;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class DuplicateNicknameException extends RuntimeException {

    private final ErrorCode errorCode;

    public DuplicateNicknameException() {
        this.errorCode = ErrorCode.INVALID_NICKNAME;
    }
}
