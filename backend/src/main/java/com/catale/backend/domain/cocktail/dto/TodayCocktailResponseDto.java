package com.catale.backend.domain.cocktail.dto;

import com.catale.backend.domain.cocktail.entity.Cocktail;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TodayCocktailResponseDto {

      // 오늘의 칵테일 정보
      private Long cocktailId;
      private String imageUrl;
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
      private String content;
      private String ingredient;
      private int base;
      private int emotion1;
      private int emotion2;
      private int emotion3;
      private int likeCount;
      private int fruit;

      private boolean isLike;

      private List<CocktailSimpleInfoDto> recommendedCocktailList;

      public TodayCocktailResponseDto(Cocktail cocktail){
            this.cocktailId = cocktail.getId();
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
