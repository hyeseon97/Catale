package com.catale.backend.global.exception.review;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class ReviewCreateException extends RuntimeException{
    private final ErrorCode errorCode;

    public ReviewCreateException() {
        this.errorCode = ErrorCode.REVIEW_CREATE_FAILED;
    }

}
