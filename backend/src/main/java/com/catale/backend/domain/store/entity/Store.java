package com.catale.backend.domain.store.entity;

import com.catale.backend.domain.base.BaseEntity;
import com.catale.backend.domain.image.entity.Image;
import com.catale.backend.domain.menu.entity.Menu;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "is_deleted = false")
@SQLDelete(sql = "UPDATE store SET is_deleted = TRUE WHERE store_id = ?")
public class Store extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private Long id;

    @OneToMany(mappedBy = "store")
    private List<Menu> menus = new ArrayList<Menu>();

    @OneToMany(mappedBy = "store")
    private List<Image> images = new ArrayList<Image>();

    @Column(name = "group_available", nullable = false)
    private boolean groupAvailable;

    @Column(name = "reservation_available", nullable = false)
    private boolean reservationAvailable;

    @Column(name = "pet_available", nullable = false)
    private boolean petAvailable;

    @Column(name = "wifi_available", nullable = false)
    private boolean wifiAvailable;

    @Column(name = "park_available", nullable = false)
    private boolean parkAvailable;

}
