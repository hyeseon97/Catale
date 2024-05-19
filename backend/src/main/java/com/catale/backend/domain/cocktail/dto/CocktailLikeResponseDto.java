package com.catale.backend.domain.cocktail.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CocktailLikeResponseDto {

    /* 좋아요 정보가 있었다면 좋아요 취소 -> false 반환,
    *  좋아요 정보가 없었다면 좋아요 -> true 반환
    * */

    private Long cocktailId;
    private boolean isLiked;

}
