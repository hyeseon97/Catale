package com.catale.backend.domain.member.repository.custom;

import static com.catale.backend.domain.image.entity.QImage.image;
import static com.catale.backend.domain.member.entity.QMember.member;

import com.catale.backend.domain.member.dto.MemberInfoDto;
import com.catale.backend.domain.member.dto.NicknameRequestDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom {

    private final JPAQueryFactory query;
    @Override
    public Optional<MemberInfoDto> getMemberInfo(Long myId) {
        /* 주의! 생성자 파라미터 순서 일치시켜야함 */
        return Optional.ofNullable(query.select(
                        Projections.constructor(MemberInfoDto.class, member.email, member.nickname, image.url, member.alc,
                                                                    member.sweet, member.bitter, member.sour, member.sparking))
                .from(member)
                .leftJoin(image).on(member.profileImage.id.eq(image.id))
                .where(member.id.eq(myId))
                .fetchOne());

    }

    public Long updateMemberNickname(Long memberId, String nickname){
        return query.update(member)
                .set(member.nickname, nickname)
                .where(member.id.eq(memberId))
                .execute();
    }

    public Long updateMemberPassword(Long memberId, String newpassword){
        return query.update(member)
                .set(member.password, newpassword)
                .where(member.id.eq(memberId))
                .execute();
    }

}
