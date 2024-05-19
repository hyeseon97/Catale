package com.catale.backend.domain.like.repository.custom;

import com.catale.backend.domain.like.dto.LikeResponseDto;
import com.catale.backend.domain.like.entity.Like;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import static com.catale.backend.domain.cocktail.entity.QCocktail.cocktail;
import static com.catale.backend.domain.like.entity.QLike.like;
import static com.catale.backend.domain.member.entity.QMember.member;

@RequiredArgsConstructor
public class LikeRepositoryImpl implements LikeRepositoryCustom{
    private final JPAQueryFactory query;
    @Override
    public Optional<LikeResponseDto> getIsLike(Long memberId, Long cocktailId) {
        return Optional.ofNullable(query.select(Projections.constructor(LikeResponseDto.class, like.id, like.member.id, like.cocktail.id))
                .from(like)
                .where(like.cocktail.id.eq(cocktailId)
                        .and(like.member.id.eq(memberId))
                        .and(like.isDeleted.eq(false)))
                        .fetchOne());
    }

    @Override
    public Optional<Like> getLike(Long memberId, Long cocktailId) {
        return Optional.ofNullable(query.selectFrom(like)
                        .where(like.cocktail.id.eq(cocktailId)
                        .and(like.member.id.eq(memberId))
                        .and(like.isDeleted.eq(false)))
                        .fetchOne());
    }

    @Override
    public Long updateLikeCount(Long cocktailId, int newLikeCount) {
        return query.update(cocktail)
                .set(cocktail.likeCount, newLikeCount)
                .where(cocktail.id.eq(cocktailId))
                .execute();
    }


}
