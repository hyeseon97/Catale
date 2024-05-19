package com.catale.backend.domain.like.repository;

import com.catale.backend.domain.like.entity.Like;
import com.catale.backend.domain.like.repository.custom.LikeRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long>, LikeRepositoryCustom {
}
