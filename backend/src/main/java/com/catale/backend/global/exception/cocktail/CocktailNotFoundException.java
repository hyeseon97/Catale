package com.catale.backend.global.exception.cocktail;

import com.catale.backend.global.format.response.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.Getter;

@RequiredArgsConstructor
public class CocktailNotFoundException extends RuntimeException {
    private final ErrorCode errorCode;
    public CocktailNotFoundException() {
        this.errorCode = ErrorCode.COCKTAIL_NOT_FOUND;
    }

}
