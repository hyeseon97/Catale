package com.catale.backend.global.exception.diary;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class DiaryNotFoundException extends RuntimeException{
    private final ErrorCode errorCode;

    public DiaryNotFoundException() {
        this.errorCode = ErrorCode.DIARY_NOT_FOUND;
    }

}
