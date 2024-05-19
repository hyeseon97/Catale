package com.catale.backend.domain.diary.repository;

import com.catale.backend.domain.diary.entity.Diary;
import com.catale.backend.domain.diary.repository.custom.DiaryRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long>, DiaryRepositoryCustom {


}
