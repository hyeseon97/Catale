package com.catale.backend.domain.like.repository.custom;

import com.catale.backend.domain.like.dto.LikeResponseDto;
import com.catale.backend.domain.like.entity.Like;

import java.util.Optional;

public interface LikeRepositoryCustom {
    Optional<LikeResponseDto> getIsLike(Long memberId, Long cocktailId);

    Optional<Like> getLike(Long memberId, Long cocktailId);
    Long updateLikeCount(Long cocktailId, int newLikeCount);
}
