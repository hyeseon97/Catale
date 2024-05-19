package com.catale.backend.domain.cocktail.repository.custom;

import com.catale.backend.domain.cocktail.dto.*;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CocktailRepositoryCustom {
    Optional<List<CocktailListResponseDto>> getCocktails(Pageable page);
    Optional<List<CocktailGetLikeResponseDto>> getLikeCoctails(Long memberId, Pageable page);

    Optional<List<CocktailSimpleInfoDto>> searchByKeyword(String keyword, Pageable page);
    Optional<List<CocktailSimpleInfoDto>> searchByOption(int base, int alc, int sweet, int sour, int bitter, int sparkling, Pageable page);
    Optional<List<CoctailMyreviewResponseDto>> getCocktailMyReviewList(Long memberId, Pageable page);

}
