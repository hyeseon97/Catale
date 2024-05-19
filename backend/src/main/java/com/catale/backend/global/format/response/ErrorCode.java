package com.catale.backend.global.format.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // 글로벌 예외 처리
    GLOBAL_UNEXPECTED_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "처리 중 예기치 않은 서버 오류가 발생했습니다."),

    // 요청 관련 예외 처리
    REQUEST_METHOD_NOT_SUPPORTED(HttpStatus.METHOD_NOT_ALLOWED, "지원하지 않는 HTTP 메서드입니다."),
    MEDIA_TYPE_NOT_SUPPORTED(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "지원하지 않는 미디어 타입입니다."),
    MISSING_SERVLET_REQUEST_PARAMETER(HttpStatus.BAD_REQUEST, "필수 요청 파라미터가 누락되었습니다."),
    SERVLET_REQUEST_BINDING_EXCEPTION(HttpStatus.BAD_REQUEST, "요청 바인딩 오류가 발생했습니다."),
    CONVERSION_NOT_SUPPORTED(HttpStatus.INTERNAL_SERVER_ERROR, "지원되지 않는 변환 유형입니다."),
    TYPE_MISMATCH(HttpStatus.BAD_REQUEST, "타입 불일치 오류가 발생했습니다."),
    MESSAGE_NOT_READABLE(HttpStatus.BAD_REQUEST, "메시지를 읽을 수 없습니다."),
    MESSAGE_NOT_WRITABLE(HttpStatus.INTERNAL_SERVER_ERROR, "메시지를 쓸 수 없습니다."),
    METHOD_ARGUMENT_NOT_VALID(HttpStatus.BAD_REQUEST, "메서드 인자가 유효하지 않습니다."),
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "접근이 거부되었습니다."),
    AUTHENTICATION_FAILED(HttpStatus.UNAUTHORIZED, "인증에 실패했습니다."),
    MISSING_PATH_VARIABLE(HttpStatus.BAD_REQUEST, "PathVariable 파라미터가 요청에 포함되지 않았습니다."),

    ACCESS_TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "액세스 토큰을 찾을 수 없습니다."),
    REFRESH_TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "새로운 로그인이 필요합니다. 재로그인을 진행해주세요."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "토큰이 존재하지 않습니다."),
    INVALID_TOKEN_TYPE(HttpStatus.UNAUTHORIZED, "로그인 정보 형식이 올바르지 않습니다."),
    MODIFIED_TOKEN_DETECTED(HttpStatus.UNAUTHORIZED, "로그인 정보가 변경되었습니다."),
    INVALID_TOKEN_FORMAT(HttpStatus.UNAUTHORIZED, "토큰 형식이 유효하지 않습니다."),
    UNAUTHORIZED_ACCESS(HttpStatus.UNAUTHORIZED, "서비스 이용을 위해 로그인이 필요합니다."),

    // 회원 관련 예외 처리
    SIGNUP_FAILED(HttpStatus.BAD_REQUEST, "회원 가입에 실패했습니다."),
    LOGIN_FAILED(HttpStatus.UNAUTHORIZED, "이메일 혹은 패스워드 정보가 정확하지 않습니다."),
    PASSWORD_MISMATCH(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다."),

    EMAIL_DUPLICATED(HttpStatus.CONFLICT, "이미 사용 중인 이메일입니다."),
    EMAIL_NOT_FOUND(HttpStatus.BAD_REQUEST, "존재하지 않는 이메일입니다."),
    INVALID_NICKNAME(HttpStatus.BAD_REQUEST, "이미 사용 중인 닉네임입니다."),
    EMAIL_SEND_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "인증 이메일 전송에 실패했습니다."),
    AUTH_CODE_INVALID(HttpStatus.BAD_REQUEST, "인증 코드가 유효하지 않습니다."),

    PROFILE_UPDATE_FAILED(HttpStatus.BAD_REQUEST, "회원정보를 수정할 수 없습니다."),

    //다이어리 예외 처리
    DIARY_CREATE_FAILED(HttpStatus.BAD_REQUEST, "다이어리를 생성할 수 없습니다."),
    DIARY_NOT_FOUND(HttpStatus.NOT_FOUND, "다이어리를 찾을 수 없습니다."),
    DIARY_DELETE_FAILED(HttpStatus.BAD_REQUEST, "다이어리를 삭제할 수 없습니다."),

    //리뷰 예외 처리
    REVIEW_LIST_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 칵테일의 리뷰 리스트를 찾을 수 없습니다."),
    REVIEW_CREATE_FAILED(HttpStatus.NOT_FOUND, "리뷰를 생성할 수 없습니다."),
    REVIEW_DELETE_FAILED(HttpStatus.BAD_REQUEST, "리뷰를 삭제할 수 없습니다."),
    REVIEW_NOT_FOUND(HttpStatus.NOT_FOUND, "리뷰를 찾을 수 없습니다."),

    //칵테일 예외 처리
    COCKTAIL_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 칵테일을 찾을 수 없습니다."),

    //이미지 예외 처리
    IMAGE_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 이미지를 찾을 수 없습니다."),
    IMAGE_FILE_NOT_FOUND(HttpStatus.BAD_REQUEST, "수정할 이미지 파일을 찾을 수 없습니다."),
    IMAGE_REGISTRATION_FAILED(HttpStatus.BAD_REQUEST,"이미지를 등록할 수 없습니다."),
    FILE_TYPE_INCORRECT(HttpStatus.BAD_REQUEST,"이미지 타입의 파일을 업로드 해주세요."),
    IMAGE_UPDATE_FAILED(HttpStatus.BAD_REQUEST,"이미지를 수정할 수 없습니다.");


    private final HttpStatus status;
    private final String message;

}


