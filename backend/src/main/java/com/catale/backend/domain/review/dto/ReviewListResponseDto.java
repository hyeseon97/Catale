package com.catale.backend.domain.review.dto;

import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewListResponseDto {
    private Long id;

    private Long memberId;

    private String nickname;

    private String profileImage;

    private String content;

    private int sweet;

    private int bitter;

    private int sour;

    private int sparking;

    private LocalDateTime createAt;

}
