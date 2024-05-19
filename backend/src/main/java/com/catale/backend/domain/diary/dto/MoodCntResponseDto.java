package com.catale.backend.domain.diary.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MoodCntResponseDto {

    private Long veryBad;
    private Long bad;
    private Long soso;
    private Long good;
    private Long veryGood;
}
