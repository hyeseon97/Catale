package com.catale.backend.global.exception.diary;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class DiaryCreateException extends RuntimeException{
    private final ErrorCode errorCode;

    public DiaryCreateException() {
        this.errorCode = ErrorCode.DIARY_CREATE_FAILED;
    }

}
