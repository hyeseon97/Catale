package com.catale.backend.domain.member.controller;

import com.catale.backend.domain.cocktail.dto.CocktailLikeListRequestDto;
import com.catale.backend.domain.cocktail.service.CocktailService;
import com.catale.backend.domain.diary.dto.MoodCntResponseDto;
import com.catale.backend.domain.diary.service.DiaryService;
import com.catale.backend.domain.member.dto.*;

import com.catale.backend.domain.member.entity.Member;

import com.catale.backend.domain.member.service.MemberService;
import com.catale.backend.global.format.code.ApiResponse;
import com.catale.backend.global.format.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Member 컨트롤러", description = "Member Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController {

    private final ApiResponse response;
    private final MemberService memberService;
    private final DiaryService diaryService;
    private final CocktailService cocktailService;

    @Operation(summary = "일반 회원가입", description = "일반 회원가입")
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequestDto requestDto,
                                    BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return response.fail(bindingResult);
        }

        Long savedId = memberService.create(requestDto);
        return response.success(ResponseCode.MEMBER_SIGNUP_SUCCESS, savedId);

    }

    @Operation(summary = "일반 로그인", description = "일반 로그인")
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDto requestDto,
                                   BindingResult bindingResult,
                                   HttpServletResponse httpServletResponse) {

        if (bindingResult.hasErrors()) {
            return response.fail(bindingResult);
        }

        return response.success(ResponseCode.LOGIN_SUCCESS, memberService.login(requestDto, httpServletResponse));
    }

    @Operation(summary = "로그아웃", description = "로그아웃")
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@Parameter(hidden = true) Authentication authentication,
                                    HttpServletResponse servletResponse) {
        return response.success(ResponseCode.LOGOUT_SUCCESS, memberService.logout(authentication.getName(), servletResponse));
    }

    @Operation(summary = "이메일 중복 검사", description = "해당 이메일로 가입 가능한지 여부 체크")
    @PostMapping("/email/verification")
    public ResponseEntity<?> emailVerification(@Valid @RequestBody EmailValidationRequestDto requestDto) {

        return response.success(ResponseCode.EMAIL_VERIFIED_SUCCESS, memberService.checkEmailDuplication(requestDto));
    }

//    @Operation(summary = "닉네임 중복 확인", description = "회원가입 시 닉네임 중복 확인")
//    @PostMapping("/nickname/verification")
//    public ResponseEntity<?> nicknameVerification(@Valid @RequestBody NicknameDoubleCheckRequestDto responseDto){
//
//        return response.success(ResponseCode.NICKNAME_AVAILABLE, memberService.checkNicknameDuplication(responseDto));
//    }

    @Operation(summary = "취향정보 등록/수정 요청", description = "회원 취향정보 등록/수정 요청")
    @PostMapping("/preference")
    public ResponseEntity<?> postPreference(@Parameter(hidden = true) Authentication authentication,
                                            @RequestBody PostPreferenceRequestDto requestDto) {

        return response.success(ResponseCode.PREFERENCE_UPDATED, memberService.postPreference(authentication, requestDto));
    }

    @Operation(summary = "비밀번호 확인(회원정보 수정)", description = "회원 비밀번호 확인 요청")
    @PostMapping("/password/verification")
    public ResponseEntity<?> checkPassword(@Parameter(hidden = true) Authentication authentication,
                                           @RequestBody PasswordValidationRequestDto requestDto) {

        return response.success(ResponseCode.PASSWORD_CHECK_SUCCESS, memberService.checkPassword(authentication, requestDto));
    }


    @Operation(summary = "닉네임 수정 요청", description = "닉네임 수정")
    @PutMapping("/name")
    public ResponseEntity<?> updateNickname(@Parameter(hidden = true) Authentication authentication,
                                            @Valid @RequestBody NicknameRequestDto requestDto, BindingResult bindingResult){

        if (bindingResult.hasErrors()) {
            return response.fail(bindingResult);
        }

        Long nicknameUpdate = memberService.updateNickname(authentication, requestDto);
        return response.success(ResponseCode.NICKNAME_UPDATED, nicknameUpdate);

    }

    @Operation(summary = "비밀번호 수정 요청", description = "비밀번호 수정")
    @PutMapping("/password")
    public ResponseEntity<?> updatePassword(@Parameter(hidden = true) Authentication authentication,
                                            @RequestBody PasswordRequestDto requestDto){


        Long passwordUpdate = memberService.updatePassword(authentication, requestDto);
        return response.success(ResponseCode.PASSWORD_UPDATE_SUCCESS, passwordUpdate);
    }

    @Operation(summary = "월 별 기분 개수 조회", description = "마이페이지 월별 나의 기분 그래프에서 사용")
    @GetMapping("/mood")
    public ResponseEntity<?> getMonthlyMood(@Parameter(hidden = true) Authentication authentication,
                                            @RequestParam int year, @RequestParam int month){

        MoodCntResponseDto moodCnt = diaryService.getMoodCntList(year, month, authentication);

        return response.success(ResponseCode.MONTHLY_DIARY_MOOD_CNT_FETCHED, moodCnt);

    }

    @Operation(summary = "회원가입 시 유저가 좋아하는 칵테일들 선택", description = "회원가입 시 유저가 좋아하는 칵테일들 선택. 마이페이지 좋아하는 칵테일에 추가됨")
    @PostMapping("/choose")
    public ResponseEntity<?> chooseCocktail(@Parameter(hidden = true) Authentication authentication,
                                            @RequestBody CocktailLikeListRequestDto requestDto){ //CocktailLikeListRequestDto는 칵테일 DTO에 있음

        return response.success(ResponseCode.SIGNUP_LIKED_COCKTAIL_LIST_FETCHED, cocktailService.postCocktailLikeList(authentication, requestDto));
    }



//    @Operation(summary = "소셜 회원가입", description = "소셜 회원가입")
//    @PostMapping("/social")
//    public ResponseEntity<?> signupBySocial(@Valid @RequestBody SignupRequestDto requestDto,
//                                            BindingResult bindingResult) {
//        return response.success(ResponseCode.MEMBER_SIGNUP_SUCCESS.getMessage());
//    }
//
//
//    @Operation(summary = "인증코드 인증 요청", description = "메일로 받은 인증코드를 입력해서 인증 요청")
//    @PostMapping("/email/verify")
//    public ResponseEntity<?> emailVerify(@Valid @RequestBody EmailCheckRequestDto requestDto,
//                                         BindingResult bindingResult,
//                                         HttpServletResponse servletResponse) {
//
//        if (bindingResult.hasErrors()) {
//            return response.fail(bindingResult);
//        }
//
//        return response.success(ResponseCode.EMAIL_VERIFIED_SUCCESS,
//                mailService.confirmAuthCode(requestDto.getEmail(), requestDto.getAuthNum(), servletResponse));
//    }
//
//    @Operation(summary = "닉네임 중복 검사", description = "닉네임의 중복 여부를 검사")
//    @GetMapping("/nickname/{nickname}/exists")
//    public ResponseEntity<?> nicknameExists(@Nickname @PathVariable String nickname) {
//        boolean result = memberService.checkNicknameDuplication(nickname);
//        return response.success(result ? ResponseCode.DUPLICATE_NICKNAME : ResponseCode.NICKNAME_AVAILABLE, result);
//    }
//
//
//
//    @Operation(summary = "소셜 로그인", description = "소셜 로그인")
//    @PostMapping("/login/social")
//    public ResponseEntity<?> loginBySocial(@RequestBody LoginRequestDto member) {
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//



}
