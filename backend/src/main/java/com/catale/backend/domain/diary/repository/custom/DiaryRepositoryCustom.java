package com.catale.backend.domain.diary.repository.custom;

import com.catale.backend.domain.diary.dto.DiaryGetResponseDto;
import com.catale.backend.domain.diary.dto.DiaryMonthResponseDto;
import com.catale.backend.domain.diary.dto.MoodCntResponseDto;

import java.util.List;
import java.util.Optional;

public interface DiaryRepositoryCustom {

    Optional<List<DiaryMonthResponseDto>> getDiraryMonth(int year, int month, Long memberId);

    Optional<DiaryGetResponseDto> getDiaryDetail(Long diaryId);

    Optional<MoodCntResponseDto> getMoodList(int year, int month, Long memberId);

    Optional<DiaryGetResponseDto> getDiaryDetailByDate(Long member, int year, int month, int day);

    Optional<DiaryMonthResponseDto> getTodayDiary(Long member);

}
