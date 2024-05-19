package com.catale.backend.domain.review.entity;

import com.catale.backend.domain.base.BaseEntity;
import com.catale.backend.domain.cocktail.entity.Cocktail;
import com.catale.backend.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
/* soft delete 관련 */
@Where(clause = "is_deleted = false")
@SQLDelete(sql = "UPDATE review SET is_deleted = TRUE WHERE review_id = ?")
public class Review extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cocktail_id")
    private Cocktail cocktail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "content", columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "rate", nullable = false)
    private int rate;

    @Column(name = "sweet", nullable = false)
    private int sweet;

    @Column(name = "bitter", nullable = false)
    private int bitter;

    @Column(name = "sour", nullable = false)
    private int sour;

    @Column(name = "sparking", nullable = false)
    private int sparking;



}
