package com.catale.backend.domain.diary.repository.custom;

import com.catale.backend.domain.diary.dto.DiaryGetResponseDto;
import com.catale.backend.domain.diary.dto.DiaryMonthResponseDto;
import com.catale.backend.domain.diary.dto.MoodCntResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static com.catale.backend.domain.cocktail.entity.QCocktail.cocktail;
import static com.catale.backend.domain.diary.entity.QDiary.diary;

@RequiredArgsConstructor
public class DiaryRepositoryImpl implements DiaryRepositoryCustom{
    private final JPAQueryFactory query;
    private final int VERYBAD = 1;
    //월 별 다이어리 조회
    @Override
    public Optional<List<DiaryMonthResponseDto>> getDiraryMonth(int year, int month, Long memberId) {
        return Optional.ofNullable(query.select(
                        Projections.constructor(DiaryMonthResponseDto.class, diary.id, cocktail.id, diary.mood, cocktail.color1, cocktail.color2, cocktail.color3, cocktail.glass, diary.createdAt))
                .from(diary)
                .leftJoin(cocktail).on(diary.cocktail.id.eq(cocktail.id))
                .where(diary.createdAt.year().eq(year)
                        .and(diary.createdAt.month().eq(month))
                        .and(diary.member.id.eq(memberId))
                        .and(diary.isDeleted.eq(false)))
                .fetch());
    }

    //월 별 기분 개수 조회
    public Optional<MoodCntResponseDto> getMoodList(int year, int month, Long memberId) {
        return Optional.ofNullable(query.select(Projections.constructor(MoodCntResponseDto.class,
                        new CaseBuilder().when(diary.mood.eq(1)).then(1L).otherwise(0L).sum().as("veryBad"),
                        new CaseBuilder().when(diary.mood.eq(2)).then(1L).otherwise(0L).sum().as("bad"),
                        new CaseBuilder().when(diary.mood.eq(3)).then(1L).otherwise(0L).sum().as("soso"),
                        new CaseBuilder().when(diary.mood.eq(4)).then(1L).otherwise(0L).sum().as("good"),
                        new CaseBuilder().when(diary.mood.eq(5)).then(1L).otherwise(0L).sum().as("veryGood")

                ))
                .from(diary)
                .where(diary.member.id.eq(memberId)
                        .and(diary.createdAt.year().eq(year))
                        .and(diary.createdAt.month().eq(month)))
                .fetchOne()
        );
    }

    @Override
    public Optional<DiaryGetResponseDto> getDiaryDetailByDate(Long memberId, int year, int month, int day) {
        return Optional.ofNullable(query.select(
                        Projections.constructor(DiaryGetResponseDto.class,  diary.id,diary.member.id,diary.mood,
                                diary.comment, diary.reason, diary.emotion1, diary.emotion2, diary.emotion3,
                                diary.createdAt,
                                cocktail.id , cocktail.image.url ,cocktail.name, cocktail.alc,
                                cocktail.sweet, cocktail.sour, cocktail.bitter, cocktail.sparking, cocktail.color1,
                                cocktail.color2, cocktail.color3, cocktail.glass, cocktail.content,
                                cocktail.ingredient, cocktail.base, cocktail.likeCount, cocktail.fruit))
                .from(diary)
                .leftJoin(cocktail).on(diary.cocktail.id.eq(cocktail.id))
                .where(diary.createdAt.year().eq(year)
                        .and(diary.createdAt.month().eq(month))
                        .and(diary.createdAt.dayOfMonth().eq(day))
                        .and(diary.member.id.eq(memberId))
                        .and(diary.isDeleted.eq(false)))
                .fetchOne());
    }

    @Override
    public Optional<DiaryMonthResponseDto> getTodayDiary(Long memberId) {
        LocalDate today = LocalDate.now();
        return Optional.ofNullable(query.select(
                        Projections.constructor(DiaryMonthResponseDto.class, diary.id, cocktail.id, diary.mood, cocktail.color1, cocktail.color2, cocktail.color3, cocktail.glass, diary.createdAt))
                .from(diary)
                .leftJoin(cocktail).on(diary.cocktail.id.eq(cocktail.id))
                .where(diary.createdAt.year().eq(today.getYear())
                        .and(diary.createdAt.month().eq(today.getMonthValue()))
                        .and(diary.createdAt.dayOfMonth().eq(today.getDayOfMonth()))
                        .and(diary.member.id.eq(memberId))
                        .and(diary.isDeleted.eq(false)))
                .fetchOne());
    }


    //다이어리 상세 조회
    @Override
    public Optional<DiaryGetResponseDto> getDiaryDetail(Long diaryId) {
        return Optional.ofNullable(query.select(
                Projections.constructor(DiaryGetResponseDto.class, diary.id,diary.member.id,diary.mood,
                        diary.comment, diary.reason, diary.emotion1, diary.emotion2, diary.emotion3,
                        diary.createdAt,
                        cocktail.id , cocktail.image.url ,cocktail.name, cocktail.alc,
                        cocktail.sweet, cocktail.sour, cocktail.bitter, cocktail.sparking, cocktail.color1,
                        cocktail.color2, cocktail.color3, cocktail.glass, cocktail.content,
                        cocktail.ingredient, cocktail.base, cocktail.likeCount, cocktail.fruit
//
//                        diary.cocktail
                ))
                .from(diary)
                .leftJoin(diary.cocktail, cocktail)
                .where(diary.id.eq(diaryId))
//                .and(diary.isDeleted.eq(false)))
//                .and(cocktail.isDeleted.eq(false)))
                        .fetchOne()
        );

    }


}
