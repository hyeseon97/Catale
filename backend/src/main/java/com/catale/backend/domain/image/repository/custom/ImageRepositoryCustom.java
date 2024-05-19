package com.catale.backend.domain.image.repository.custom;

import com.catale.backend.domain.image.entity.Image;

import java.util.Optional;

public interface ImageRepositoryCustom{

    Long updateMemberImage(Long memberId, String imageUrl);
}
