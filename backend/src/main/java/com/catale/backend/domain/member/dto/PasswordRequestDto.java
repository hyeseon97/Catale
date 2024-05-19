package com.catale.backend.domain.member.dto;

import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PasswordRequestDto {

    private String originPassword;
    //비밀번호 수정 dto
    @Pattern(regexp = "^(?=.*[a-z])(?=.*\\d).{5,20}$",
            message = "비밀번호는 영문 소문자와 숫자를 조합하여 5~20자 이내여야 합니다.")
    private String newPassword;
}
