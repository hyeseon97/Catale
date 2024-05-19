package com.catale.backend.domain.image.repository;

import com.catale.backend.domain.image.entity.Image;
import com.catale.backend.domain.image.repository.custom.ImageRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> , ImageRepositoryCustom {




}
