package com.catale.backend.domain.member.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostPreferenceRequestDto {
    /* 유저 취향정보 등록 dto */
    private int alc;
    private int sweet;
    private int sour;
    private int bitter;
    private int sparking;
}
