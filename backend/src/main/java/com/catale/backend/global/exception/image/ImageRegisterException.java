package com.catale.backend.global.exception.image;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class ImageRegisterException extends RuntimeException {

    private final ErrorCode errorCode;

    public ImageRegisterException(ErrorCode imageNotFound) {
        this.errorCode = ErrorCode.IMAGE_REGISTRATION_FAILED;
    }
}
