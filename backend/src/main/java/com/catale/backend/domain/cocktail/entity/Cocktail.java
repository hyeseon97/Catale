package com.catale.backend.domain.cocktail.entity;

import com.catale.backend.domain.base.BaseEntity;
import com.catale.backend.domain.image.entity.Image;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "is_deleted = false")
@SQLDelete(sql = "UPDATE cocktail SET is_deleted = TRUE WHERE cocktail_id = ?")
public class Cocktail extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cocktail_id")
    private Long id;

    @OneToOne(mappedBy = "cocktail")
    private Image image;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "alc", nullable = false)
    private int alc;

    @Column(name = "sweet", nullable = false)
    private int sweet;

    @Column(name = "sour", nullable = false)
    private int sour;

    @Column(name = "bitter", nullable = false)
    private int bitter;

    @Column(name = "sparking", nullable = false)
    private int sparking;

    /* 칵테일의 색은 1~9까지로 나뉘어짐,
    * 1: 핑크 / 2: 빨강 / 3: 주황 / 4: 노랑 / 5: 갈색 / 6: 클리어 / 7: 초록 / 8: 화이트 / 9: 파랑
    *  */
    @Column(name = "color1", nullable = false)
    private String color1;

    @Column(name = "color2", nullable = false)
    private String color2;

    @Column(name = "color3", nullable = false)
    private String color3;

    @Column(name = "glass", nullable = false)
    private int glass;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "ingredient", nullable = false, length = 1000)
    private String ingredient;

    @Column(name = "base", nullable = false)
    private int base;

    @Column(name = "emotion1", nullable = false)
    private int emotion1;

    @Column(name = "emotion2")
    private int emotion2;

    @Column(name = "emotion3")
    private int emotion3;

    @Column(name = "like_count", nullable = false)
    private int likeCount;

    @Column(name = "fruit")
    private int fruit;

}
