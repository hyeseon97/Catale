package com.catale.backend.domain.store.service;

import com.catale.backend.domain.menu.dto.MenuGetResponseDto;
import com.catale.backend.domain.menu.repository.MenuRepository;
import com.catale.backend.domain.store.dto.StoreGetResponseDto;
import com.catale.backend.domain.store.entity.Store;
import com.catale.backend.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreService {

    @Autowired
    private final StoreRepository storeRepository;
    private final MenuRepository menuRepository;

    //가게 전체 조회
    @Transactional(readOnly = true)
    public List<StoreGetResponseDto> StoreFindAll() {
        List<Store> storeList = storeRepository.findAll();
        List<StoreGetResponseDto> list = new ArrayList<>();
        for (Store s : storeList) {
            list.add(new StoreGetResponseDto(s));
        }
        return list;
    }

    //가게 상세 조회
    @Transactional(readOnly = true)
    public StoreGetResponseDto findById(Long id) {
        Store store = storeRepository.findById(id).orElseThrow(NullPointerException::new);

        StoreGetResponseDto dto = new StoreGetResponseDto(store);
        List<MenuGetResponseDto> menuList = menuRepository.getMenuList(store.getId()).orElse(new ArrayList<>());
        dto.setMenus(menuList);

        return dto;
    }

}
