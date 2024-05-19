package com.catale.backend.domain.member.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberInfoDto {

    private String email;

    private String nickname;

    private String profileImage;

    private int alc;

    private int sweet;

    private int bitter;

    private int sour;

    private int sparking;
}
