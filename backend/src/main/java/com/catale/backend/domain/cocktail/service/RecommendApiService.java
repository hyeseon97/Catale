package com.catale.backend.domain.cocktail.service;

import com.catale.backend.domain.cocktail.dto.CocktailListResponseDto;
import java.util.List;
import java.util.stream.Collectors;

import com.catale.backend.domain.cocktail.dto.GetMemberRecommendDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import reactor.core.publisher.Mono;
import org.springframework.web.reactive.function.client.WebClient;

@Log4j2
@Component
@RequiredArgsConstructor
public class RecommendApiService {

      private final WebClient webClient = WebClient.builder()
//                                                   .baseUrl("https://fastapi.silvstone.xyz/rec")
              .baseUrl("http://localhost:8000/rec")
                                                    .build();


      /* 오늘의 칵테일과 유사한 칵테일 추천결과 반환 */
      public List<Long> getTodayCocktailResponse(Long cocktailId) {
            log.info("apiService 진입");
            return this.webClient.get()
                                .uri("/today/{cocktail_id}", cocktailId)
                                .retrieve()
                                .bodyToMono(new ParameterizedTypeReference<List<Long>>() {})
                                .block();

      }


      /* memberId 1~10 */
      public List<Long> getPersonalRecommendResponse(int memberId) {
            return webClient.get()
                    .uri("/personal/{user_id}", memberId)
                    .retrieve()
                    .bodyToFlux(Long.class)
                    .toStream().collect(Collectors.toList());
      }

      /* 1~10 이외 */
      public List<Long> getUserRecommendResponse(int[] preference) {
            return webClient.post()
                    .uri("/personal")
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .bodyValue(preference)
                    .retrieve()
                    .bodyToFlux(Long.class)
                    .toStream().collect(Collectors.toList());
      }

//      private List<Long> recWebClientCall(PersonalWhiskyCallDto personalWhiskyCallDto) throws HttpClientErrorException.UnprocessableEntity, HttpServerErrorException.InternalServerError {
//            return webClient.post()
//                    .uri("/rec/personal-whisky")
//                    .contentType(MediaType.APPLICATION_JSON)
//                    .accept(MediaType.APPLICATION_JSON)
//                    .bodyValue(personalWhiskyCallDto)
//                    .retrieve()
//                    .bodyToFlux(Long.class)
//                    .toStream().collect(Collectors.toList());
//      }
}
