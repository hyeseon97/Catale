package com.catale.backend.domain.cocktail.dto;

import com.catale.backend.domain.cocktail.entity.Cocktail;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CocktailSimpleInfoDto {

      private Long cocktailId;
      private String name;
      private String color1;
      private String color2;
      private String color3;
      private int glass;

      private boolean isLike;

      public CocktailSimpleInfoDto(Cocktail cocktail){
            this.cocktailId = cocktail.getId();
            this.name = cocktail.getName();
            this.color1 = cocktail.getColor1();
            this.color2 = cocktail.getColor2();
            this.color3 = cocktail.getColor3();
            this.glass = cocktail.getGlass();
      }

}
