package com.catale.backend.domain.review.controller;

import com.catale.backend.domain.member.entity.Member;
import com.catale.backend.domain.member.service.MemberService;
import com.catale.backend.domain.review.dto.ReviewGetRequestDto;
import com.catale.backend.domain.review.dto.ReviewGetResponseDto;
import com.catale.backend.domain.review.dto.ReviewListResponseDto;
import com.catale.backend.domain.review.service.ReviewService;
import com.catale.backend.global.format.code.ApiResponse;
import com.catale.backend.global.format.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Review 컨트롤러", description = "Review Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/review")
public class ReviewController {

    private final ApiResponse response;
    private final ReviewService reviewService;
    private final MemberService memberService;

    @Operation(summary = "칵테일별 리뷰 전체 조회", description = "각 칵테일 별 전체 리뷰 조회")
    @GetMapping("/{cocktailId}")
    public ResponseEntity<?> getReviews(@PathVariable(name = "cocktailId") Long cocktailId,
                                        @PageableDefault(page = 0, size = 10) Pageable page){

        List<ReviewListResponseDto> reviewList = reviewService.getReviews(cocktailId, page);
        return response.success(ResponseCode.REVIEW_LIST_FETCHED,reviewList);
    }
    @Operation(summary = "칵테일 리뷰 작성", description = "칵테일에 대한 리뷰 작성")
    @PostMapping
    public ResponseEntity<?> postReview(@Parameter(hidden = true) Authentication authentication,
                                        @Valid @RequestBody ReviewGetRequestDto dto){

        Long reviewId = reviewService.postReview(authentication, dto);
        return response.success(ResponseCode.REVIEW_CREATED,reviewId);
    }
    @Operation(summary = "칵테일 리뷰 삭제", description = "칵테일 리뷰 삭제")
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deletReview(@PathVariable(name = "reviewId") Long reviewId){
        Long id = reviewService.deleteReview(reviewId);
        return response.success(ResponseCode.REVIEW_DELETED);
    }
}
