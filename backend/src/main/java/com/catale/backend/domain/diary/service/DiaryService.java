package com.catale.backend.domain.diary.service;

import com.catale.backend.domain.cocktail.dto.CocktailSimpleInfoDto;
import com.catale.backend.domain.cocktail.entity.Cocktail;
import com.catale.backend.domain.cocktail.repository.CocktailRepository;
import com.catale.backend.domain.cocktail.service.RecommendApiService;
import com.catale.backend.domain.diary.dto.DiaryGetRequestDto;
import com.catale.backend.domain.diary.dto.DiaryGetResponseDto;
import com.catale.backend.domain.diary.dto.DiaryMonthResponseDto;
import com.catale.backend.domain.diary.dto.MoodCntResponseDto;
import com.catale.backend.domain.diary.entity.Diary;
import com.catale.backend.domain.diary.repository.DiaryRepository;
import com.catale.backend.domain.like.service.LikeService;
import com.catale.backend.domain.member.entity.Member;
import com.catale.backend.domain.member.repository.MemberRepository;
import com.catale.backend.domain.member.service.MemberService;
import com.catale.backend.global.exception.cocktail.CocktailNotFoundException;
import com.catale.backend.global.exception.diary.DiaryNotFoundException;
import com.catale.backend.global.exception.member.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DiaryService {
    private final MemberService memberService;
    private final RecommendApiService apiService;
    private final LikeService likeService;
    private final DiaryRepository diaryRepository;
    private final CocktailRepository cocktailRepository;
    private final MemberRepository memberRepository;

    //다이어리 상세조회
    @Transactional
    public DiaryGetResponseDto getDiaryDetail(Long diaryId){
        return diaryRepository.getDiaryDetail(diaryId).orElseThrow(NullPointerException::new);
    }
    //월 별 다이어리 조회
    @Transactional
    public List<DiaryMonthResponseDto> getDiarys(int year, int month, Authentication authentication){
        Member me = memberService.findMember(authentication.getName());
        Long memberId = me.getId();

        List<DiaryMonthResponseDto> diaryList = diaryRepository.getDiraryMonth(year,month,memberId).orElseThrow(NullPointerException::new);
        return diaryList;
    }
    //월 별 기분 개수 조회
    @Transactional
    public MoodCntResponseDto getMoodCntList(int year, int month, Authentication authentication){
        Member me = memberService.findMember(authentication.getName());
        Long memberId = me.getId();

        MoodCntResponseDto moodCnt = diaryRepository.getMoodList(year, month, memberId).orElseThrow(NullPointerException::new);
        return moodCnt;


    }

    // 다이어리 등록
    @Transactional
    public Long postDiary(Authentication authentication, DiaryGetRequestDto dto){
        Member me = memberService.findMember(authentication.getName());
        Long memberId = me.getId();

        LocalDate date = LocalDate.now();

        Optional<DiaryGetResponseDto> opt = diaryRepository.getDiaryDetailByDate(memberId, date.getYear(), date.getMonthValue(), date.getDayOfMonth());
        if(opt.isPresent()){
            diaryRepository.deleteById(opt.get().getId());
        }

        //칵테일 레포지토리에서 칵테일 아이디로 칵테일 찾아서 저장
        Cocktail cocktail = cocktailRepository.findById(dto.getCocktailId()).orElseThrow(NullPointerException::new);
        Diary diary = Diary.builder()
                .member(memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new))
                .cocktail(cocktail)
                .mood(dto.getMood())
                .comment(dto.getComment())
                .reason(dto.getReason())
                .emotion1(dto.getEmotion1())
                .emotion2(dto.getEmotion2())
                .emotion3(dto.getEmotion3())
                .build();
        Diary saveDiary = diaryRepository.save(diary);

        if(saveDiary.getId() == null){

        }
        return saveDiary.getId();
    }
    //다이어리 삭제
    @Transactional
    public void deleteDiary(Long diaryId){
        diaryRepository.deleteById(diaryId);
    }

    //날짜로 다이어리 상세정보 조회
    @Transactional
    public DiaryGetResponseDto getDiaryDetailByDate(Authentication authentication, int year, int month, int day){
        Member member = memberService.findMember(authentication.getName());
        Long memberId = member.getId();

        DiaryGetResponseDto dto = diaryRepository.getDiaryDetailByDate(memberId,year,month,day).orElseThrow(DiaryNotFoundException::new);

        // FastAPI 호출, 연관 칵테일 Id list 반환
        List<Long> recommendedIdList = apiService.getTodayCocktailResponse(dto.getCocktailId());
        // id -> dto로 변환
        List<CocktailSimpleInfoDto> simpleInfoDtos = recommendedIdList.stream()
                .map(id -> {
                    Cocktail cocktail = cocktailRepository.findById(id)
                            .orElseThrow(CocktailNotFoundException::new);
                    return cocktail;
                }).map(cocktail -> {
                    CocktailSimpleInfoDto simpleInfoDto = new CocktailSimpleInfoDto(cocktail);
                    simpleInfoDto.setLike(likeService.checkisLiked(memberId, cocktail.getId()));
                    return simpleInfoDto;
                }).toList();

        dto.setRecommendedCocktailList(simpleInfoDtos);

        return dto;
    }

    //오늘의 다이어리 유뮤 조회
    @Transactional
    public boolean isExsitTodayDiary(Authentication authentication){
        Member me = memberService.findMember(authentication.getName());
        Long memberId = me.getId();

        Optional<DiaryMonthResponseDto> dto = diaryRepository.getTodayDiary(memberId);
        if(dto.isEmpty()){
            return false;
        }
        return true;
    }



}
