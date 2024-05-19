package com.catale.backend.domain.review.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewGetRequestDto {

    private Long cocktailId;

    private String content;

    private int rate;

    private int sweet;

    private int bitter;

    private int sour;

    private int sparking;

    public ReviewGetRequestDto(Long cocktailId, String content, int rate, int sweet, int bitter, int sour, int sparking) {
        this.cocktailId = cocktailId;
        this.content = content;
        this.rate = rate;
        this.sweet = sweet;
        this.bitter = bitter;
        this.sour = sour;
        this.sparking = sparking;
    }
}