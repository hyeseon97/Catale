package com.catale.backend.domain.member.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NicknameDoubleCheckRequestDto {
    private String nickname;
}
