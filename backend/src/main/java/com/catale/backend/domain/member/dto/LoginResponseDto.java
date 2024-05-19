package com.catale.backend.domain.member.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LoginResponseDto {

    private String token;
    private MemberInfo memberInfo;

    // 취향설문 참여 여부, 설문함 - TRUE, 설문안함 - FALSE
    private boolean check;

}
