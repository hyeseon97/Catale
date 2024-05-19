package com.catale.backend.domain.review.repository.custom;

import com.catale.backend.domain.review.dto.ReviewGetResponseDto;
import com.catale.backend.domain.review.dto.ReviewListResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ReviewRepositoryCustom {
    Optional<List<ReviewListResponseDto>> findByCocktailId(Long CocktailId, Pageable page);
    Optional<List<ReviewGetResponseDto>> findByMemberId(Long cocktailId, Long memberId);
}
