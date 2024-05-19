package com.catale.backend.domain.like.service;

import com.catale.backend.domain.like.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class LikeService {
      private final LikeRepository likeRepository;

      @Transactional
      public boolean checkisLiked(Long memberid, Long cocktailId){
            return likeRepository.getLike(memberid, cocktailId)
                                 .isPresent();
      }
}
