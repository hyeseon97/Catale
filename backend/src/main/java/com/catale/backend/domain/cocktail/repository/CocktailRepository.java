package com.catale.backend.domain.cocktail.repository;

import com.catale.backend.domain.cocktail.entity.Cocktail;
import com.catale.backend.domain.cocktail.repository.custom.CocktailRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface CocktailRepository extends JpaRepository<Cocktail, Long>, CocktailRepositoryCustom {

}
