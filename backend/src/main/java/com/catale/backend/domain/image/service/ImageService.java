package com.catale.backend.domain.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.catale.backend.domain.cocktail.entity.Cocktail;
import com.catale.backend.domain.cocktail.repository.CocktailRepository;
import com.catale.backend.domain.diary.entity.Diary;
import com.catale.backend.domain.image.entity.Image;
import com.catale.backend.domain.image.repository.ImageRepository;
import com.catale.backend.domain.member.entity.Member;
import com.catale.backend.domain.member.service.MemberService;
import com.catale.backend.domain.store.entity.Store;
import com.catale.backend.domain.store.repository.StoreRepository;
import com.catale.backend.global.exception.image.*;
import com.catale.backend.global.exception.member.MemberNotFoundException;
import com.catale.backend.global.format.response.ErrorCode;
import jakarta.persistence.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
@PropertySource("classpath:application-aws.yml")
public class ImageService {

    private final ImageRepository imageRepository;
    private final AmazonS3 amazonS3;
    private final CocktailRepository cocktailRepository;
    private final StoreRepository storeRepository;
    private final MemberService memberService;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Transactional
    public String  updateMemberImage(Authentication authentication, MultipartFile multipartFile){

        Member me = memberService.findMember(authentication.getName());
        Long memberId = me.getId();

        if(multipartFile == null || multipartFile.isEmpty()){
            throw new ImageFileNotFoundException(ErrorCode.IMAGE_FILE_NOT_FOUND);
        }


        String uuidFilename = "images/" + UUID.randomUUID();
        String imageUrl = "";

        System.out.println("타입 : " + multipartFile.getContentType());
        if(!multipartFile.getContentType().startsWith("image/")){
            throw new FileTypeIncorrectException(ErrorCode.FILE_TYPE_INCORRECT);
        }
        try {
            ObjectMetadata objectMetadata = new ObjectMetadata(); // 이미지를 담을 메타데이터를 생성합니다.
            objectMetadata.setContentType(multipartFile.getContentType()); // 이미지의 타입을 설정합니다.
            objectMetadata.setContentLength(multipartFile.getSize()); // 이미지의 길이를 설정합니다.

            amazonS3.putObject(bucket, uuidFilename, multipartFile.getInputStream(), objectMetadata); // 메타데이터를 Amazon S3에 객체를 업로드합니다.

        } catch(IOException e) { // 입출력 예외가 발생한 경우 예외를 처리합니다.
            throw new ImageRegisterException(ErrorCode.IMAGE_REGISTRATION_FAILED); //예외처리 (수정 필요할듯)
        }
        imageUrl = amazonS3.getUrl(bucket,uuidFilename).toString(); //업로드한 이미지 url가져오기
        Long updateImage = imageRepository.updateMemberImage(memberId, imageUrl); //업로드한 이미지 url로 프로필 수정
        if(updateImage == 0){
            throw new ImageUpdateException(ErrorCode.IMAGE_UPDATE_FAILED);
        }

        return imageUrl;
    }

    public String saveCocktailImage(Long cocktailId, MultipartFile multipartFile){
        String uuidFilename = "images/" + UUID.randomUUID();
        String imageUrl = "";
        try {
            ObjectMetadata objectMetadata = new ObjectMetadata(); // 이미지를 담을 메타데이터를 생성합니다.
            objectMetadata.setContentType(multipartFile.getContentType()); // 이미지의 타입을 설정합니다.
            objectMetadata.setContentLength(multipartFile.getSize()); // 이미지의 길이를 설정합니다.

            amazonS3.putObject(bucket, uuidFilename, multipartFile.getInputStream(), objectMetadata); // 메타데이터를 Amazon S3에 객체를 업로드합니다.

        } catch(IOException e) { // 입출력 예외가 발생한 경우 예외를 처리합니다.
            throw new ImageRegisterException(ErrorCode.IMAGE_REGISTRATION_FAILED); //예외처리 (수정 필요할듯)
        }
        imageUrl = amazonS3.getUrl(bucket,uuidFilename).toString(); //업로드한 이미지 url가져오기
        Cocktail cocktail = cocktailRepository.findById(cocktailId).orElseThrow(NullPointerException::new);
        Image image = Image.builder()
                .url(imageUrl)
                .store(null)
                .member(null)
                .cocktail(cocktail)
                .build();
        Image saveImage = imageRepository.save(image);
        return saveImage.getUrl();
    }

    public List<String> saveStoreImage(Long storeId, List<MultipartFile> multipartFiles){

        List<String> imageUrls = new ArrayList<>();

        try {

            for(MultipartFile m : multipartFiles){
                String uuidFilename = "images/" + UUID.randomUUID();
                ObjectMetadata objectMetadata = new ObjectMetadata(); // 이미지를 담을 메타데이터를 생성합니다.
                objectMetadata.setContentType(m.getContentType()); // 이미지의 타입을 설정합니다.
                objectMetadata.setContentLength(m.getSize()); // 이미지의 길이를 설정합니다.

                amazonS3.putObject(bucket, uuidFilename, m.getInputStream(), objectMetadata); // 메타데이터를 Amazon S3에 객체를 업로드합니다.
                String imageUrl = amazonS3.getUrl(bucket,uuidFilename).toString();
                imageUrls.add(imageUrl );//업로드한 이미지 url가져오기
                Store store = storeRepository.findById(storeId).orElseThrow(NullPointerException::new);
                Image image = Image.builder()
                        .url(imageUrl)
                        .store(store)
                        .member(null)
                        .cocktail(null)
                        .build();
                Image saveImage = imageRepository.save(image);
            }

        } catch(IOException e) { // 입출력 예외가 발생한 경우 예외를 처리합니다.
            throw new ImageRegisterException(ErrorCode.IMAGE_REGISTRATION_FAILED); //예외처리 (수정 필요할듯)
        }

        return imageUrls;
    }
}
