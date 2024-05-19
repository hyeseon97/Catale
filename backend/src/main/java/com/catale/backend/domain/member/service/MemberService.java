package com.catale.backend.domain.member.service;

import com.catale.backend.domain.image.entity.Image;
import com.catale.backend.domain.image.repository.ImageRepository;
import com.catale.backend.domain.member.dto.*;
import com.catale.backend.domain.member.entity.Member;
import com.catale.backend.domain.member.repository.MemberRepository;
import com.catale.backend.global.exception.member.*;
import com.catale.backend.global.jwt.TokenInfo;
import com.catale.backend.global.jwt.provider.TokenProvider;
import com.catale.backend.global.jwt.repository.RefreshTokenRepository;
import com.catale.backend.global.jwt.service.TokenService;
import com.catale.backend.global.util.CookieUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Log4j2
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final ImageRepository imageRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRepository refreshTokenRepository;
    private final TokenProvider tokenProvider;
    private final TokenService tokenService;
    private final CookieUtil cookieUtil;



    /* 일반 회원가입 로직*/
    @Transactional
    public Long create(SignupRequestDto requestDto) {

        memberRepository.searchByNickname(requestDto.getNickname()).ifPresent(this::throwDuplicateNicknameException);

        /* 비밀번호 불일치 */
        checkPasswordConfirmation(requestDto.getPassword(), requestDto.getPasswordConfirm());

        /* 이메일 중복 검증 */
        memberRepository.searchByEmail(requestDto.getEmail())
                .ifPresent(this::throwDuplicateEmailException);

        Member member = Member.of(requestDto, passwordEncoder.encode(requestDto.getPassword()), false);
        memberRepository.save(member);

        Image image = Image.builder()
                .url("https://cattale-bucket.s3.ap-northeast-2.amazonaws.com/images/profileImage.png")
                .store(null)
                .member(member)
                .cocktail(null)
                .build();
        imageRepository.save(image);

        return member.getId();
    }


    @Transactional
    public LoginResponseDto login(LoginRequestDto requestDto, HttpServletResponse response) {
        log.info("event=LoginAttempt, email={}", requestDto.getEmail());

        Member member = searchMemberByEmail(requestDto.getEmail());

        isPasswordMatchingWithEncoded(requestDto.getPassword(), member.getPassword());
        log.info("passwordMatched");
        removeOldRefreshToken(requestDto, member);

        TokenInfo tokenInfo = tokenProvider.generateTokenInfo(member.getEmail());
        tokenService.saveToken(tokenInfo);
        cookieUtil.addCookie("RefreshToken", tokenInfo.getRefreshToken(), tokenProvider.getREFRESH_TOKEN_TIME(), response);


        MemberInfo info = MemberInfo.builder()
                .memberId(member.getId())
                .profileImageId(Optional.ofNullable(member.getProfileImage()).map(Image::getId).orElse(null))
                .profileImageUrl(Optional.ofNullable(member.getProfileImage()).map(Image::getUrl).orElse(null))
                .email(member.getEmail())
                .nickname(member.getNickname())
                .alc(member.getAlc())
                .sweet(member.getSweet())
                .sour(member.getSour())
                .bitter(member.getBitter())
                .sparking(member.getSparking())
                .build();


        /* 취향설문 참여여부 확인 */
        int surveyCheck = member.getAlc();
        boolean check = surveyCheck != -1;

        return LoginResponseDto.builder()
                .token(tokenInfo.getAccessToken())
                .memberInfo(info)
                .check(check)
                .build();
    }

    @Transactional
    public String logout(String email, HttpServletResponse servletResponse) {
        cookieUtil.removeCookie("RefreshToken", servletResponse);
        refreshTokenRepository.findByEmail(email)
                .ifPresent(refreshTokenRepository::delete);
        return email;
    }

    public Member findMember(String email) {
        return memberRepository.searchByEmail(email).orElseThrow(MemberNotFoundException::new);
    }

    private Member searchMemberByEmail(String email) {
        Member member = memberRepository.searchByEmail(email)
                .orElseThrow(EmailNotFoundException::new);
        log.info("event=MemberSearchByEmail, email={}", email);
        return member;
    }

    @Transactional
    public EmailValidationResponseDto checkEmailDuplication(EmailValidationRequestDto requestDto) {
        Optional<Member> member = memberRepository.searchByEmail(requestDto.getEmail());
        if (member.isEmpty()) {
            return new EmailValidationResponseDto(true);
        } else {
            return new EmailValidationResponseDto(false);
        }
    }

    @Transactional
    public Long postPreference(Authentication authentication, PostPreferenceRequestDto requestDto) {
        Member member = findMember(authentication.getName());
        member.updatePreference(requestDto.getAlc(), requestDto.getSweet(), requestDto.getSour(), requestDto.getBitter(), requestDto.getSparking());
        return member.getId();
    }

    @Transactional
    public Long checkPassword(Authentication authentication, PasswordValidationRequestDto requestDto){
        Member member = findMember(authentication.getName());

        String password = requestDto.getPassword();
        isPasswordMatchingWithEncoded(password, member.getPassword());

        return member.getId();
    }





    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    private void removeOldRefreshToken(LoginRequestDto requestDto, Member member) {
//        log.info("email:" + member.getEmail());
        refreshTokenRepository.findByEmail(member.getEmail())
                .ifPresent(refreshTokenRepository::delete);
        log.info("event=DeleteExistingRefreshToken, email={}", requestDto.getEmail());
    }

    @Transactional
    public Long updateNickname(Authentication authentication, NicknameRequestDto requestDto) {

        Member me = findMember(authentication.getName());
        Long memberId = me.getId();

        memberRepository.searchByNickname(requestDto.getName()).ifPresent(this::throwDuplicateNicknameException);
        return memberRepository.updateMemberNickname(memberId, requestDto.getName());

    }

    private void throwDuplicateEmailException(Member member) {
        throw new DuplicateEmailException();
    }

    private void throwDuplicateNicknameException(Member member){throw new InvalidNicknameException();}

    private void isPasswordMatchingWithEncoded(String input, String encoded) {
        if (!passwordEncoder.matches(input, encoded)) {
            throw new InvalidLoginAttemptException();
        }
    }

    private void checkPasswordConfirmation(String password, String passwordConfirm) {
        if (!password.equals(passwordConfirm)) {
            throw new PasswordMismatchException();
        }
    }


    @Transactional
    public Long updatePassword(Authentication authentication, PasswordRequestDto requestDto){
        Member me = findMember(authentication.getName());
        Long memberId = me.getId();

        Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);

        if (passwordEncoder.matches(requestDto.getOriginPassword(), member.getPassword())) {
            return memberRepository.updateMemberPassword(memberId, passwordEncoder.encode(requestDto.getNewPassword()));
        }

//        System.out.println("패스워드 : "+member.getPassword());
//        System.out.println("new : "+passwordEncoder.encode(requestDto.getOriginPassword()));
        throw new PasswordMismatchException();
    }

//    @Transactional
//    public String checkNicknameDuplication(NicknameDoubleCheckRequestDto responseDto) {
//
//        if(memberRepository.searchByNickname(responseDto.getNickname()).isPresent()){
//            throw new DuplicateNicknameException();
//        }
//        return responseDto.getNickname();
//    }
}