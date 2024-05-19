package com.catale.backend.domain.cocktail.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GetMemberRecommendDto {

    /* 칵테일 개인 맞춤 추천 요청 DTO */
    @NotNull
    private Long memberId;
    private List<PreferenceDto> preferenceDtoList;
}
