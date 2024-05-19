package com.catale.backend.domain.menu.repository.custom;

import com.catale.backend.domain.menu.dto.MenuGetResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import static com.catale.backend.domain.cocktail.entity.QCocktail.cocktail;
import static com.catale.backend.domain.menu.entity.QMenu.menu;

@RequiredArgsConstructor
public class MenuRepositoryImpl implements MenuRepositoryCustom{

    private final JPAQueryFactory query;

    @Override
    public Optional<List<MenuGetResponseDto>> getMenuList(Long storeId) {
        return Optional.ofNullable(query.select(Projections.constructor(MenuGetResponseDto.class,
                menu.id,menu.store.id, menu.cocktail.id, menu.isSignature, menu.price, cocktail.alc, cocktail.image.url, cocktail.name
                ))
                .from(menu).leftJoin(cocktail)
                .on(menu.cocktail.id.eq(cocktail.id))
                .where(menu.store.id.eq(storeId))
                .fetch()
        );
    }

    @Override
    public Optional<List<Long>> findByCocktilId(Long cocktailId) {
        return Optional.ofNullable(query.select(Projections.constructor(Long.class, menu.store.id))
                        .from(menu)
                        .where(menu.cocktail.id.eq(cocktailId))
                        .fetch()
        );
    }
}
