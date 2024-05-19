package com.catale.backend.domain.store.controller;

import com.catale.backend.domain.store.dto.StoreGetResponseDto;
import com.catale.backend.domain.store.entity.Store;
import com.catale.backend.domain.store.service.StoreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Tag(name = "Store 컨트롤러", description = "Store Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/store")
public class StoreController {

    private final StoreService storeService;

    @Operation(summary = "가게 리스트 전체 조회", description = "가게 리스트 전체 조회")
    @GetMapping
    public ResponseEntity<?> findAllStore(){

        List<StoreGetResponseDto> stores = storeService.StoreFindAll();
        return new ResponseEntity<List<StoreGetResponseDto>>(stores, HttpStatus.OK);
    }

    @Operation(summary = "가게 상세 조회", description = "가게 상세 페이지 조회")
    @GetMapping("/{storeId}")
    public ResponseEntity<?> findStore(@PathVariable Long storeId){
        StoreGetResponseDto store = storeService.findById(storeId);
        return new ResponseEntity<StoreGetResponseDto>(store, HttpStatus.OK);
    }

}
