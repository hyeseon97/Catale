package com.catale.backend.global.format.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.actuate.autoconfigure.observation.ObservationProperties.Http;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ResponseCode {

    /* 회원(Member) */
    MEMBER_SIGNUP_SUCCESS(HttpStatus.CREATED, "회원가입이 정상적으로 완료되었습니다."),
    NICKNAME_CHECK_SUCCESS(HttpStatus.OK, "닉네임 검사가 성공적으로 이루어졌습니다."),
    NICKNAME_UPDATED(HttpStatus.OK, "닉네임 수정이 성공적으로 이루어졌습니다."),
    LOGIN_SUCCESS(HttpStatus.OK, "로그인이 성공적으로 이루어졌습니다."),
    SOCIAL_LOGIN_SUCCESS(HttpStatus.OK, "소셜 로그인이 성공적으로 이루어졌습니다."),
    LOGOUT_SUCCESS(HttpStatus.OK, "로그아웃이 성공적으로 이루어졌습니다."),
    PASSWORD_RESET_SUCCESS(HttpStatus.OK, "비밀번호 재설정이 성공적으로 이루어졌습니다."),
    PASSWORD_UPDATE_SUCCESS(HttpStatus.OK, "비밀번호 업데이트가 성공적으로 이루어졌습니다."),
    PASSWORD_CHECK_SUCCESS(HttpStatus.OK, "비밀번호 확인이 성공적으로 이루어졌습니다."),
    MEMBER_INFO_UPDATE_SUCCESS(HttpStatus.OK, "회원 정보가 성공적으로 업데이트되었습니다."),
    FOLLOWINGS_FETCH_SUCCESS(HttpStatus.OK, "팔로잉 리스트를 성공적으로 불러왔습니다."),
    FOLLOWERS_FETCH_SUCCESS(HttpStatus.OK, "팔로워 리스트를 성공적으로 불러왔습니다."),
    FOLLOW_SUCCESS(HttpStatus.OK, "팔로우가 성공적으로 이루어졌습니다."),
    UNFOLLOW_SUCCESS(HttpStatus.OK, "언팔로우가 성공적으로 이루어졌습니다."),
    FOLLOWER_DELETE_SUCCESS(HttpStatus.OK, "팔로워가 성공적으로 삭제되었습니다."),
    FOLLOW_CANCEL_SUCCESS(HttpStatus.OK, "팔로우를 성공적으로 취소했습니다."),
    ACCOUNT_SECESSION_SUCCESS(HttpStatus.OK, "계정 탈퇴가 성공적으로 이루어졌습니다."),
    PRIVACY_SETTING_UPDATED(HttpStatus.OK, "계정 공개여부가 성공적으로 설정되었습니다."),
    NOTIFICATION_SETTING_UPDATED(HttpStatus.OK, "알림 설정이 성공적으로 업데이트되었습니다."),
    MONTHLY_DIARY_MOOD_CNT_FETCHED(HttpStatus.OK, "월 별 기분 개수 조회가 성공적으로 조회되었습니다."),
    SIGNUP_LIKED_COCKTAIL_LIST_FETCHED(HttpStatus.OK, "회원가입시 선택한 내 취향 칵테일 리스트가 성공적으로 처리되었습니다."),

    EMAIL_VERIFICATION_SENT(HttpStatus.OK, "이메일 인증코드가 성공적으로 발송되었습니다."),
    EMAIL_VERIFIED_SUCCESS(HttpStatus.OK, "이메일 사용가능 여부가 조회되었습니다."),
    EMAIL_VERIFICATION_REQUEST_SUCCESS(HttpStatus.OK, "이메일 인증요청이 성공적으로 처리되었습니다."),
    NICKNAME_AVAILABLE(HttpStatus.OK, "사용 가능한 닉네임입니다"),
    DUPLICATE_NICKNAME(HttpStatus.OK, "중복된 닉네임입니다"),

    PREFERENCE_UPDATED(HttpStatus.OK, "칵테일 취향 정보 반영이 성공적으로 처리되었습니다."),

    /* 칵테일 */
    COCKTAIL_LIST_FETCHED(HttpStatus.OK, "전체 칵테일 리스트가 성공적으로 조회되었습니다."),
    COCKTAIL_DETAIL_FETCHED(HttpStatus.OK, "칵테일 상세정보가 성공적으로 조회되었습니다."),
    LIKED_COCKTAIL_LIST_FETCHED(HttpStatus.OK, "좋아요 한 칵테일 리스트가 성공적으로 조회되었습니다."),
    SEARCHED_COCKTAIL_LIST_FETCHED(HttpStatus.OK, "검색한 칵테일 리스트가 성공적으로 조회되었습니다."),
    REVIEW_COCKTAIL_LIST_FETCHED(HttpStatus.OK, "내가 마신 칵테일 리스트가 성공적으로 조회되었습니다."),
    /* 다이어리(Diary) */
    MONTHLY_DIARY_LIST_FETCHED(HttpStatus.OK, "월 별 다이어리 리스트가 성공적으로 조회되었습니다."),
    DIARY_CREATED(HttpStatus.OK, "다이어리가 성공적으로 생성되었습니다."),
    DIARY_INFO_FETCHED(HttpStatus.OK, "다이어리 정보가 성공적으로 조회되었습니다."),
    DIARY_DELETED(HttpStatus.OK, "다이어리가 성공적으로 삭제되었습니다."),
    TODAY_DIARY_NOT_FOUND(HttpStatus.OK, "오늘의 다이어리가 없습니다."),
    TODAY_DIARY_FETCHED(HttpStatus.OK, "오늘의 다이어리가 성공적으로 조회되었습니다."),

    /* 리뷰(Review) */
    REVIEW_LIST_FETCHED(HttpStatus.OK, "리뷰 리스트가 성공적으로 조회되었습니다."),
    REVIEW_CREATED(HttpStatus.OK, "리뷰가 성공적으로 생성되었습니다."),
    REVIEW_DELETED(HttpStatus.OK, "리뷰가 성공적으로 삭제되었습니다."),

    /* 검색(Search) */
    POPULAR_KEYWORDS_FETCHED(HttpStatus.OK, "인기 검색어가 성공적으로 조회되었습니다."),
    CONTENTS_SEARCHED(HttpStatus.OK, "컨텐츠 검색 결과가 성공적으로 조회되었습니다."),
    BOOKS_SEARCHED(HttpStatus.OK, "책 검색 결과가 성공적으로 조회되었습니다."),
    ACCOUNTS_SEARCHED(HttpStatus.OK, "계정 검색 결과가 성공적으로 조회되었습니다."),
    MENTION_ACCOUNTS_SEARCHED(HttpStatus.OK, "멘션을 위한 계정 검색 결과가 성공적으로 조회되었습니다."),
    REALTIME_RECOMMENDED_KEYWORDS_FETCHED(HttpStatus.OK, "실시간 추천 검색어가 성공적으로 조회되었습니다."),

    /* 이미지 */
    IMAGE_UPDATED(HttpStatus.OK, "프로필 이미지가 성공적으로 수정되었습니다."),
    STORE_IMAGE_POST(HttpStatus.OK, "가게 사진들이 성공적으로 들어갔습니다.");

    private final HttpStatus status;
    private final String message;

}

