package com.catale.backend.domain.review.repository;

import com.catale.backend.domain.review.entity.Review;
import com.catale.backend.domain.review.repository.custom.ReviewRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewRepositoryCustom {

}
