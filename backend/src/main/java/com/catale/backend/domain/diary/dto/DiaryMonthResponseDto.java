package com.catale.backend.domain.diary.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DiaryMonthResponseDto {
    private Long id;
    private Long cocktailId;
    private int mood;

    private String color1;
    private String color2;
    private String color3;
    private int glass;

    private LocalDateTime createdAt;
}
