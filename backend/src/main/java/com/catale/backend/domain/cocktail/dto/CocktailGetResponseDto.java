package com.catale.backend.domain.cocktail.dto;

import com.catale.backend.domain.cocktail.entity.Cocktail;

import lombok.Data;


import com.catale.backend.domain.review.dto.ReviewGetResponseDto;
import lombok.Data;

import java.util.List;


@Data
public class CocktailGetResponseDto {

    private Long id;
    private String imageUrl;
    private String name;
    private int alc;
    private int sweet;
    private int sour;
    private int bitter;
    private int sparking;
    /* 칵테일의 색은 1~9까지로 나뉘어짐,
     * 1: 핑크 / 2: 빨강 / 3: 주황 / 4: 노랑 / 5: 갈색 / 6: 클리어 / 7: 초록 / 8: 화이트 / 9: 파랑
     *  */
    private String color1;
    private String color2;
    private String color3;
    private int glass;
    private String content;
    private String ingredient;
    private int base;
    private int emotion1;
    private int emotion2;
    private int emotion3;
    private int likeCount;
    private int fruit;
    private boolean isLike;
    private List<Long> storeIdList;


    public CocktailGetResponseDto(Cocktail cocktail) {
        this.id = cocktail.getId();
        this.imageUrl = cocktail.getImage().getUrl();
        this.name = cocktail.getName();
        this.alc = cocktail.getAlc();
        this.sweet = cocktail.getSweet();
        this.sour = cocktail.getSour();
        this.bitter = cocktail.getBitter();
        this.sparking = cocktail.getSparking();
        this.color1 = cocktail.getColor1();
        this.color2 = cocktail.getColor2();
        this.color3 = cocktail.getColor3();
        this.glass = cocktail.getGlass();
        this.content = cocktail.getContent();
        this.ingredient = cocktail.getIngredient();
        this.base = cocktail.getBase();
        this.emotion1 = cocktail.getEmotion1();
        this.emotion2 = cocktail.getEmotion2();
        this.emotion3 = cocktail.getEmotion3();
        this.likeCount = cocktail.getLikeCount();
        this.fruit = cocktail.getFruit();
    }
}
