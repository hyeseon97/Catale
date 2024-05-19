package com.catale.backend.domain.cocktail.repository.custom;

import com.catale.backend.domain.cocktail.dto.*;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

import static com.catale.backend.domain.cocktail.entity.QCocktail.cocktail;
import static com.catale.backend.domain.like.entity.QLike.like;
import static com.catale.backend.domain.review.entity.QReview.review;

@RequiredArgsConstructor
public class CocktailRepositoryImpl implements CocktailRepositoryCustom {
    private final JPAQueryFactory query;

    //칵테일 전체 조회
    @Override
    public Optional<List<CocktailListResponseDto>> getCocktails(Pageable page) {
        return Optional.ofNullable(query.select(Projections.constructor(CocktailListResponseDto.class,
                        cocktail.id, cocktail.name, cocktail.color1, cocktail.color2, cocktail.color3, cocktail.glass, cocktail.content))
                .from(cocktail)
                        .where(cocktail.isDeleted.eq(false))
                        .orderBy(cocktail.likeCount.desc())
                .offset(page.getOffset())
                .limit(page.getPageSize())
                .fetch());
    }

    //좋아요한 칵테일들 조회
    @Override
    public Optional<List<CocktailGetLikeResponseDto>> getLikeCoctails(Long memberId, Pageable page) {
        return Optional.ofNullable(query.select(Projections.constructor(CocktailGetLikeResponseDto.class,
                cocktail.id, cocktail.name, cocktail.color1, cocktail.color2, cocktail.color3, cocktail.glass))
                .from(like)
                .leftJoin(cocktail).on(like.cocktail.id.eq(cocktail.id))
                .where(like.member.id.eq(memberId)
                        .and(like.isDeleted.eq(false))
                        .and(cocktail.isDeleted.eq(false)))
                        .orderBy(like.createdAt.desc())
                .offset(page.getOffset())
                .limit(page.getPageSize())
                .fetch());
    }


    //키워드로 칵테일 검색 - 칵테일 이름에 한 함
    @Override
    public Optional<List<CocktailSimpleInfoDto>> searchByKeyword(String keyword, Pageable page){
        return Optional.ofNullable(query.select(Projections.constructor(CocktailSimpleInfoDto.class, cocktail))
                .from(cocktail)
                .where(cocktail.name.like('%' + keyword + '%').and(cocktail.isDeleted.eq(false)))
                .offset(page.getOffset())
                .limit(page.getPageSize())
                .fetch());
    }

    //옵션으로 칵테일 검색 - 도수, 베이스 술, 단맛, 신맛, 쓴맛, 탄산 정도
    @Override
    public Optional<List<CocktailSimpleInfoDto>> searchByOption(int base, int alc, int sweet, int sour, int bitter, int sparkling, Pageable page) {
        return Optional.ofNullable(query.select(Projections.constructor(CocktailSimpleInfoDto.class, cocktail))
                .from(cocktail)
                .where(eqBase(base), eqAlc(alc), eqSweet(sweet), eqSour(sour), eqBitter(bitter), eqSparkling(sparkling))
                .offset(page.getOffset())
                .limit(page.getPageSize())
                .fetch());
    }

    //내가 쓴 리뷰 쓴 칵테일 조회 - 내가 먹어본 칵테일
    @Override
    public Optional<List<CoctailMyreviewResponseDto>> getCocktailMyReviewList(Long memberId, Pageable page) {
        Sort sort = page.getSort();


        OrderSpecifier<?> orderByExpression;


        // 첫 번째 정렬 조건을 가져옵니다.
        Sort.Order order = sort.iterator().next();
        switch (order.getProperty()) {
            case "createdAt":
                // createdAt이 정렬 기준인 경우
                if (order.getDirection().isDescending()) {
                    orderByExpression = review.createdAt.max().desc();
                } else {
                    orderByExpression = review.createdAt.max().asc();
                }
                break;
            case "rate":
                // rate가 정렬 기준인 경우
                if (order.getDirection().isDescending()) {
                    orderByExpression = review.rate.max().desc();
                } else {
                    orderByExpression = review.rate.max().asc();
                }
                break;
            default:
                // 지정된 정렬 기준이 없는 경우
                // 기본값은 createdAt.max()를 내림차순으로 정렬합니다.
                orderByExpression = review.createdAt.max().desc();
                break;
        }


        // 쿼리를 실행하여 결과를 반환합니다.
        return Optional.ofNullable(query
                .select(Projections.constructor(CoctailMyreviewResponseDto.class,
                        cocktail.id, cocktail.name, cocktail.color1, cocktail.color2, cocktail.color3, cocktail.glass, cocktail.content))
                .from(cocktail)
                .innerJoin(review).on(cocktail.id.eq(review.cocktail.id))
                .where(review.member.id.eq(memberId))
                .groupBy(cocktail.id, cocktail.name)
                .orderBy(orderByExpression)
                .offset(page.getOffset())
                .limit(page.getPageSize())
                .fetch());
    }



    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    private BooleanExpression eqBase(int base) {
        if(base == -1) {
            return null;
        }
        return cocktail.base.eq(base);
    }

    private BooleanExpression eqAlc(int alc) {
        /*
        * 1 = 1 ~ 10
        * 2 = 11 ~ 15
        * 3 = 16 ~ 20
        * 4 = 21 ~ 29
        * 5 = 30 이상*/
        if(alc == -1) {
            return null;
        } else if(alc == 1){
            return cocktail.alc.between(1, 10);
        }else if(alc == 2){
            return cocktail.alc.between(11, 15);
        }else if(alc == 3){
            return cocktail.alc.between(16, 20);
        }else if(alc == 4){
            return cocktail.alc.between(21, 29);
        }else if(alc == 5){
            return cocktail.alc.between(30, 99);
        }
        return cocktail.alc.eq(0);
    }

    private BooleanExpression eqSweet(int sweet) {
        if(sweet == -1) {
            return null;
        }
        return cocktail.sweet.eq(sweet);
    }

    private BooleanExpression eqSour(int sour) {
        if(sour == -1) {
            return null;
        }
        return cocktail.sour.eq(sour);
    }

    private BooleanExpression eqBitter(int bitter) {
        if(bitter == -1) {
            return null;
        }
        return cocktail.bitter.eq(bitter);
    }

    private BooleanExpression eqSparkling(int sparkling) {
        if(sparkling == -1) {
            return null;
        }
        return cocktail.sparking.eq(sparkling);
    }




}