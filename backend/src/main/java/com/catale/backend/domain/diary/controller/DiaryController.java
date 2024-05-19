package com.catale.backend.domain.diary.controller;

import com.catale.backend.domain.diary.dto.DiaryGetRequestDto;
import com.catale.backend.domain.diary.dto.DiaryGetResponseDto;
import com.catale.backend.domain.diary.dto.DiaryMonthResponseDto;
import com.catale.backend.domain.diary.service.DiaryService;
import com.catale.backend.domain.member.entity.Member;
import com.catale.backend.domain.member.service.MemberService;
import com.catale.backend.global.format.code.ApiResponse;
import com.catale.backend.global.format.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Tag(name = "Diary 컨트롤러", description = "Diary Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/diary")
public class
DiaryController {
    private final ApiResponse response;
    private final DiaryService diaryService;
    private final MemberService memberService;

    @Operation(summary = "다이어리 상세 조회", description = "날짜별 다이어리 상세 페이지 조회")
    @GetMapping("/{diaryId}")
    public ResponseEntity<?> getDiary(
            @Parameter(hidden = true) Authentication authentication,
                                      @PathVariable Long diaryId){
        DiaryGetResponseDto diary = diaryService.getDiaryDetail(diaryId);
        return response.success(ResponseCode.DIARY_INFO_FETCHED,diary);
    }

    @Operation(summary = "다이어리 저장", description = "데일리 칵테일 추천 후 다이어리에 저장")
    @PostMapping
    public ResponseEntity<?> postDiary(
            @Parameter(hidden = true) Authentication authentication,
                                       @Valid @RequestBody DiaryGetRequestDto dto){

        Long diaryId = diaryService.postDiary(authentication, dto);
        return response.success(ResponseCode.DIARY_CREATED,diaryId);
    }
    @Operation(summary = "다이어리 삭제", description = "다이어리 삭제")
    @DeleteMapping("/{diaryId}")
    public ResponseEntity<?> deleteDiary(@PathVariable Long diaryId){

        diaryService.deleteDiary(diaryId);

        return response.success(ResponseCode.DIARY_DELETED);
    }

    @Operation(summary = "월별 다이어리 조회", description = "월별 다이어리 리스트 조회")
    @GetMapping
    public ResponseEntity<?> getDiaryMonth(
            @Parameter(hidden = true) Authentication authentication,
                                           @RequestParam int year, @RequestParam int month){


        List<DiaryMonthResponseDto> list = diaryService.getDiarys(year,month,authentication);
        return response.success(ResponseCode.MONTHLY_DIARY_LIST_FETCHED,list);
    }
    @Operation(summary = "날짜로 다이어리 상세 조회", description = "날짜로 다이어리 상세 조회")
    @GetMapping("/date")
    public ResponseEntity<?> getDiaryDetailByDate(
            @Parameter(hidden = true) Authentication authentication,
            @RequestParam int year, @RequestParam int month, @RequestParam int day){

//        Member me = memberService.findMember(authentication.getName());
//        Long memberId = me.getId();

        DiaryGetResponseDto dto = diaryService.getDiaryDetailByDate(authentication, year,month,day);
        return response.success(ResponseCode.DIARY_INFO_FETCHED,dto);
    }

    @Operation(summary = "오늘의 다이어리 유무조회", description = "오늘의 다이어리 유무 조회")
    @GetMapping("/today")
    public ResponseEntity<?> getIsExistTodayDiary(
            @Parameter(hidden = true) Authentication authentication){


        boolean isExsitTodayDiary = diaryService.isExsitTodayDiary(authentication);
        if(!isExsitTodayDiary){
            return response.success(ResponseCode.TODAY_DIARY_NOT_FOUND,isExsitTodayDiary);
        }
        return response.success(ResponseCode.TODAY_DIARY_FETCHED,isExsitTodayDiary);
    }

}
