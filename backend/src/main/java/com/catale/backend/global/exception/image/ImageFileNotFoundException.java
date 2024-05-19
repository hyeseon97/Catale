package com.catale.backend.global.exception.image;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class ImageFileNotFoundException extends RuntimeException {

    private final ErrorCode errorCode;

    public ImageFileNotFoundException(ErrorCode imageNotFound) {
        this.errorCode = ErrorCode.IMAGE_FILE_NOT_FOUND;
    }
}
