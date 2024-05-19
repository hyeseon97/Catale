package com.catale.backend.domain.member.repository;

import com.catale.backend.domain.member.entity.Member;
import com.catale.backend.domain.member.repository.custom.MemberRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long>, MemberRepositoryCustom {

    Optional<Member> searchByEmail(String email);

    Optional<Member> searchByNickname(String nickname);

}
