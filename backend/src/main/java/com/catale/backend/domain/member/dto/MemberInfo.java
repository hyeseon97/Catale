package com.catale.backend.domain.member.dto;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberInfo {

    private Long memberId;
    private Long profileImageId;
    private String profileImageUrl;
    private String nickname;
    private String email;
    private boolean isSocial;
    private int alc;
    private int sweet;
    private int sour;
    private int bitter;
    private int sparking;

}
