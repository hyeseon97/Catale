package com.catale.backend.domain.menu.repository;

import com.catale.backend.domain.menu.entity.Menu;
import com.catale.backend.domain.menu.repository.custom.MenuRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> , MenuRepositoryCustom {
}
