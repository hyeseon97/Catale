package com.catale.backend.domain.image.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberImageUpdateRequestDto {
    private Long imageId;
    private String imageUrl;

    public MemberImageUpdateRequestDto(Long id, String url){
        this.imageId = id;
        this.imageUrl = url;
    }
}
