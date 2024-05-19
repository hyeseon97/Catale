package com.catale.backend.domain.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Pattern;
import  lombok.*;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NicknameRequestDto {

//    private Long memberId;
    //닉네임 수정 dto
@Pattern(regexp = "^[a-zA-Z0-9_가-힣]{3,10}$",
        message = "닉네임은 영문자, 숫자 및 언더바(_)를 포함할 수 있으며 3~10자 이내여야 합니다.")
@Schema(description = "닉네임", example = "Catale_1")
    private String name;
}
