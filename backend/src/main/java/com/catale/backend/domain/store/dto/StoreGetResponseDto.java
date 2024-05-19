package com.catale.backend.domain.store.dto;

import com.catale.backend.domain.image.entity.Image;
import com.catale.backend.domain.menu.dto.MenuGetResponseDto;
import com.catale.backend.domain.menu.entity.Menu;
import com.catale.backend.domain.store.entity.Store;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class StoreGetResponseDto {

    private Long id;
    private boolean groupAvailable;
    private boolean reservationAvailable;
    private boolean petAvailable;
    private boolean wifiAvailable;
    private boolean parkAvailable;
    private List<MenuGetResponseDto> menus;
    private List<String> images;

    public StoreGetResponseDto(Store store){
        this.id = store.getId();
        this.groupAvailable = store.isGroupAvailable();
        this.reservationAvailable = store.isReservationAvailable();
        this.petAvailable = store.isPetAvailable();
        this.wifiAvailable = store.isWifiAvailable();
        this.parkAvailable = store.isParkAvailable();
//        List<MenuGetResponseDto> menuList = new ArrayList<>();
//        for (Menu menu : store.getMenus()){
//            menuList.add(new MenuGetResponseDto(menu));
//        }
//        this.menus = menuList;
        List<String> imageList = new ArrayList<>();
        for (Image image : store.getImages()){
            imageList.add(image.getUrl());
        }
        this.images = imageList;

    }

}
