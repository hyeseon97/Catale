package com.catale.backend.global.exception.review;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class ReviewNotFoundException extends RuntimeException{
    private final ErrorCode errorCode;

    public ReviewNotFoundException() {
        this.errorCode = ErrorCode.REVIEW_NOT_FOUND;
    }

}
