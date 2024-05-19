package com.catale.backend.global.exception.image;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class ImageUpdateException extends RuntimeException {

    private final ErrorCode errorCode;

    public ImageUpdateException(ErrorCode imageNotFound) {
        this.errorCode = ErrorCode.IMAGE_UPDATE_FAILED;
    }
}
