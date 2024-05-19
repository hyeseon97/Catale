package com.catale.backend.domain.menu.entity;

import com.catale.backend.domain.base.BaseEntity;
import com.catale.backend.domain.cocktail.entity.Cocktail;
import com.catale.backend.domain.store.entity.Store;
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
@SQLDelete(sql = "UPDATE menu SET is_deleted = TRUE WHERE menu_id = ?")
public class Menu extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cocktail_id")
    private Cocktail cocktail;

    @Column(name = "is_signature", nullable = false)
    private boolean isSignature;

    @Column(name = "price", nullable = false)
    private int price;

}
