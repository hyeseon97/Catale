package com.catale.backend.domain.menu.dto;

import com.catale.backend.domain.menu.entity.Menu;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuGetResponseDto {

    private Long id;
    private Long storeId;
    private Long cocktailId;
    private boolean isSignature;
    private int price;
    private int alc;
    private String imgUrl;
    private String cocktailName;

    public MenuGetResponseDto(Menu menu){
        this.id = menu.getId();
        this.storeId = menu.getStore().getId();
        this.cocktailId = menu.getCocktail().getId();
        this.isSignature = menu.isSignature();
        this.price = menu.getPrice();
    }
}
