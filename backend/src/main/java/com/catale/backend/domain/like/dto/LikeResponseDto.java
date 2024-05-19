package com.catale.backend.domain.like.dto;

import com.catale.backend.domain.like.entity.Like;
import lombok.Data;

@Data
public class LikeResponseDto {

    private Long id;
    private Long memberId;
    private Long cocktailId;

    public LikeResponseDto(Long id, Long memberId, Long cocktailId) {
        this.id = id;
        this.memberId = memberId;
        this.cocktailId = cocktailId;
    }
}

