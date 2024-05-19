package com.catale.backend.domain.menu.repository.custom;

import com.catale.backend.domain.menu.dto.MenuGetResponseDto;

import java.util.List;
import java.util.Optional;

public interface MenuRepositoryCustom {

    Optional<List<MenuGetResponseDto>> getMenuList(Long storeId);
    Optional<List<Long>> findByCocktilId(Long cocktailId);
}
