package com.catale.backend.domain.review.dto;

import com.catale.backend.domain.review.entity.Review;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewGetResponseDto {

    private Long id;

    private Long cocktailId;

    private Long memberId;

    private String content;

    private int rate;

    private int sweet;

    private int bitter;

    private int sour;

    private int sparking;

    private LocalDateTime createAt;

}
