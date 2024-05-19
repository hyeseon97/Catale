package com.catale.backend.domain.member.repository.custom;

import com.catale.backend.domain.member.dto.MemberInfoDto;
import com.catale.backend.domain.member.dto.NicknameRequestDto;
import com.catale.backend.domain.member.entity.Member;

import java.util.Optional;

public interface MemberRepositoryCustom {

    Optional<MemberInfoDto> getMemberInfo(Long memberId);

    Long updateMemberNickname(Long memberId, String nickname);

    Long updateMemberPassword(Long memberId, String newpassword);

//    Optional<String> findByNickname(String nickname);

}
