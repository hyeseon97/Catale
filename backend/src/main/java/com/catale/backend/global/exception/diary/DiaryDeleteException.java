package com.catale.backend.global.exception.diary;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class DiaryDeleteException extends RuntimeException{
    private final ErrorCode errorCode;

    public DiaryDeleteException() {
        this.errorCode = ErrorCode.DIARY_DELETE_FAILED;
    }

}
