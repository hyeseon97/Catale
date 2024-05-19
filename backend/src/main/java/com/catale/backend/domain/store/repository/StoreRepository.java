package com.catale.backend.domain.store.repository;

import com.catale.backend.domain.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {



}
