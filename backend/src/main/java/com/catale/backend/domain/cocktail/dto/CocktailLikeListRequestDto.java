package com.catale.backend.domain.cocktail.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CocktailLikeListRequestDto {

    private List<Long> cocktailIds;
}
