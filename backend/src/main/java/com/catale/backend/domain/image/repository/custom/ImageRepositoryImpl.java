package com.catale.backend.domain.image.repository.custom;

import com.catale.backend.domain.image.entity.Image;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import static com.catale.backend.domain.image.entity.QImage.image;
import static com.catale.backend.domain.member.entity.QMember.member;

@RequiredArgsConstructor
public class ImageRepositoryImpl implements ImageRepositoryCustom{

    private final JPAQueryFactory query;
    @Override
    public Long updateMemberImage(Long memberId, String imageUrl) {
        return query.update(image)
                .set(image.url, imageUrl)
                .where(image.member.id.eq(memberId))
                .execute();
    }


}
