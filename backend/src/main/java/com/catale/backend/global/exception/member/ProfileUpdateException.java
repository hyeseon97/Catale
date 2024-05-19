package com.catale.backend.global.exception.member;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class ProfileUpdateException extends RuntimeException {

    private final ErrorCode errorCode;

    public ProfileUpdateException() {
        this.errorCode = ErrorCode.PROFILE_UPDATE_FAILED;
    }
}
