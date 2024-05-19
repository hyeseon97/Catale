package com.catale.backend.domain.cocktail.controller;

import com.catale.backend.domain.cocktail.dto.*;
import com.catale.backend.domain.cocktail.service.CocktailService;
import com.catale.backend.domain.member.entity.Member;
import com.catale.backend.domain.member.service.MemberService;
import com.catale.backend.global.format.code.ApiResponse;
import com.catale.backend.global.format.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@Tag(name = "Cocktail 컨트롤러", description = "Cocktail Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/cocktail")
public class CocktailController {

    private final ApiResponse response;
    private final MemberService memberService;
    private final CocktailService cocktailService;

    @Operation(summary = "칵테일 전체 조회", description = "칵테일 리스트 전체 조회")
    @GetMapping
    public ResponseEntity<?> getAllCocktailList(
            @Parameter(hidden = true) Authentication authentication,
            @PageableDefault(page = 0, size = 10) Pageable page) {


        return response.success(ResponseCode.COCKTAIL_LIST_FETCHED, cocktailService.getAllCocktails(authentication, page));
    }

    @Operation(summary = "내가 좋아요한 칵테일 조회", description = "내가 좋아요한 칵테일 리스트 조회")
    @GetMapping("/like")
    public ResponseEntity<?> getLikcCocktailList(
            @Parameter(hidden = true) Authentication authentication,
                                                 @PageableDefault(page = 0, size = 10) Pageable page){

        List<CocktailGetLikeResponseDto> list = cocktailService.getLikeCocktails(authentication, page);
        return response.success(ResponseCode.LIKED_COCKTAIL_LIST_FETCHED, list);
    }
    @Operation(summary = "칵테일 상세 조회", description = "칵테일 상세 조회")
    @GetMapping("/{cocktailId}")
    public ResponseEntity<?> getCocktailDetail(
            @Parameter(hidden = true) Authentication authentication,
            @PathVariable Long cocktailId){

        CocktailGetResponseDto cocktail = cocktailService.getCocktailDetail(authentication, cocktailId);
        return response.success(ResponseCode.COCKTAIL_DETAIL_FETCHED, cocktail);
    }

    @Operation(summary = "칵테일 좋아요", description = "칵테일 좋아요, 좋아요 취소")
    @GetMapping("/{cocktailId}/like")
    public ResponseEntity<?> cocktailLike(
            @Parameter(hidden = true) Authentication authentication,
            @PathVariable(name = "cocktailId") Long cocktailId){

        return response.success(ResponseCode.COCKTAIL_DETAIL_FETCHED, cocktailService.getCocktailLikeResult(authentication, cocktailId));
    }

    @Operation(summary = "오늘의 칵테일, 연관 칵테일", description = "오늘의 칵테일(상세정보포함), 연관 칵테일 목록 조회(상세정보 미포함)")
    @PostMapping("/today")
    public ResponseEntity<?> getTodayCocktail(
        @Parameter(hidden = true) Authentication authentication,
        @RequestBody TodayCocktailRequestDto todayCocktailRequestDto) {
        log.info("controller");
        return response.success(ResponseCode.COCKTAIL_DETAIL_FETCHED,
            cocktailService.getTodayCocktail(authentication, todayCocktailRequestDto));
    }

    /* lightfm 학습 모델 기반 유저 개인별 칵테일 추천 */
    @Operation(summary = "사용자 맞춤 칵테일 추천", description = "사용자 맞춤 추천 칵테일 리스트 조회(상세정보 포함)")
    @GetMapping("/recommend")
    public ResponseEntity<?> getMemberRecommendCocktail(
            @Parameter(hidden = true) Authentication authentication) {

        return response.success(ResponseCode.COCKTAIL_DETAIL_FETCHED,
                cocktailService.getMemberRecommendCocktail(authentication));
    }

    @Operation(summary = "키워드 검색으로 칵테일 조회", description = "칵테일 제목 키워드를 통한 리스트 조회")
    @GetMapping("/search")
    public ResponseEntity<?> getCocktailSearchByKeyword(
            @Parameter(hidden = true) Authentication authentication,
            @RequestParam(name = "keyword") String keyword,
            @PageableDefault(page = 0, size = 10) Pageable page
            ) {

        return response.success(ResponseCode.SEARCHED_COCKTAIL_LIST_FETCHED,
                cocktailService.getCocktailSearchByKeyword(authentication, keyword, page));
    }

    @Operation(summary = "옵션 선택을 통한 칵테일 조회", description = "옵션 선택을 통한 통한 리스트 조회, 선택하지 않은 옵션은 -1을 주시오")
    @GetMapping("/option")
    public ResponseEntity<?> getCocktailSearchByCategory(
            @Parameter(hidden = true) Authentication authentication,
            @RequestParam(name = "base") int base,
            @RequestParam(name = "alc") int alc,
            @RequestParam(name = "sweet") int sweet,
            @RequestParam(name = "sour") int sour,
            @RequestParam(name = "bitter") int bitter,
            @RequestParam(name = "sparkling") int sparkling,
            @PageableDefault(page = 0, size = 10) Pageable page
    ) {

        return response.success(ResponseCode.SEARCHED_COCKTAIL_LIST_FETCHED,
                cocktailService.getCocktailSearchByOption(authentication, base, alc, sweet, sour, bitter, sparkling, page));
    }

    @Operation(summary = "내가 리뷰단 칵테일 조회", description = "내가 먹어본(리뷰님긴) 칵테일 리스트 조회")
    @GetMapping("/reviewed")
    public ResponseEntity<?> getCocktailMyReviewList(
            @Parameter(hidden = true) Authentication authentication,
            @PageableDefault(sort ="createdAt,desc" , page = 0, size = 10) Pageable page
    ){

        List<CoctailMyreviewResponseDto> list = cocktailService.getCocktailMyReviewList(authentication, page);
        return response.success(ResponseCode.REVIEW_COCKTAIL_LIST_FETCHED, list);
    }


}
