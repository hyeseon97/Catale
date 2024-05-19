package com.catale.backend.domain.member.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EmailValidationResponseDto {

    // 가입가능 - TRUE, 가입불가 - FALSE
    private boolean check;
}
