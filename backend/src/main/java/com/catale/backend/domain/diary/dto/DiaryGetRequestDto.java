package com.catale.backend.domain.diary.dto;

import lombok.Data;

@Data
public class DiaryGetRequestDto {
    private Long cocktailId;
    private int mood;
    private String comment;
    private String reason;
    private int emotion1;
    private int emotion2;
    private int emotion3;

    public DiaryGetRequestDto(Long cocktailId, int mood, String comment, String reason, int month, int emotion1, int emotion2, int emotion3) {
        this.cocktailId = cocktailId;
        this.mood = mood;
        this.comment = comment;
        this.reason = reason;
        this.emotion1 = emotion1;
        this.emotion2 = emotion2;
        this.emotion3 = emotion3;
    }
}
