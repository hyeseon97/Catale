package com.catale.backend.global.exception.review;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class ReviewDeleteException extends RuntimeException{
    private final ErrorCode errorCode;

    public ReviewDeleteException() {
        this.errorCode = ErrorCode.REVIEW_DELETE_FAILED;
    }

}
