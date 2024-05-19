package com.catale.backend.global.exception.review;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class ReviewListNotFoundException extends RuntimeException{
    private final ErrorCode errorCode;

    public ReviewListNotFoundException() {
        this.errorCode = ErrorCode.REVIEW_LIST_NOT_FOUND;
    }

}
