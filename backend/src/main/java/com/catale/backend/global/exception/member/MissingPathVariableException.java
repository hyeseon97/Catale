package com.catale.backend.global.exception.member;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class MissingPathVariableException extends RuntimeException {

    private final ErrorCode errorCode;

    public MissingPathVariableException() {
        this.errorCode = ErrorCode.MISSING_PATH_VARIABLE;
    }
}
