package com.catale.backend.domain.diary.dto;

import com.catale.backend.domain.cocktail.dto.CocktailSimpleInfoDto;
import com.catale.backend.domain.cocktail.entity.Cocktail;
import com.catale.backend.domain.diary.entity.Diary;
import com.catale.backend.domain.image.entity.Image;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class
DiaryGetResponseDto {
    private Long id;
    private Long memberId;

    private int mood;
    private String comment;//일기 한 줄
    private String reason;
    private int emotion1;
    private int emotion2;
    private int emotion3;
    private LocalDateTime createdAt;

    private Long cocktailId;
//    private Image cocktailImage;
    private String cocktailImage;
    private String name;
    private int alc;
    private int sweet;
    private int sour;
    private int bitter;
    private int sparking;
    private String color1;
    private String color2;
    private String color3;
    private int glass;
    private String content;//칵테일 설명
    private String ingredient;
    private int base;
    private int likeCount;
    private int fruit;
//      private Cocktail cocktail;

    private List<CocktailSimpleInfoDto> recommendedCocktailList;

    public DiaryGetResponseDto(Long id, Long memberId, int mood, String comment, String reason, int emotion1, int emotion2, int emotion3, LocalDateTime createdAt, Long cocktailId, String cocktailImage, String name, int alc, int sweet, int sour, int bitter, int sparking, String color1, String color2, String color3, int glass, String content, String ingredient, int base, int likeCount, int fruit) {
        this.id = id;
        this.memberId = memberId;
        this.mood = mood;
        this.comment = comment;
        this.reason = reason;
        this.emotion1 = emotion1;
        this.emotion2 = emotion2;
        this.emotion3 = emotion3;
        this.createdAt = createdAt;
        this.cocktailId = cocktailId;
        this.cocktailImage = cocktailImage;
        this.name = name;
        this.alc = alc;
        this.sweet = sweet;
        this.sour = sour;
        this.bitter = bitter;
        this.sparking = sparking;
        this.color1 = color1;
        this.color2 = color2;
        this.color3 = color3;
        this.glass = glass;
        this.content = content;
        this.ingredient = ingredient;
        this.base = base;
        this.likeCount = likeCount;
        this.fruit = fruit;
    }
}
