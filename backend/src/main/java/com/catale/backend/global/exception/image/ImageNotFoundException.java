package com.catale.backend.global.exception.image;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class ImageNotFoundException extends RuntimeException {

    private final ErrorCode errorCode;

    public ImageNotFoundException(ErrorCode imageNotFound) {
        this.errorCode = ErrorCode.IMAGE_NOT_FOUND;
    }
}
