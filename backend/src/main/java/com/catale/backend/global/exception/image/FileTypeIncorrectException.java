package com.catale.backend.global.exception.image;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class FileTypeIncorrectException extends RuntimeException {

    private final ErrorCode errorCode;

    public FileTypeIncorrectException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
