from fastapi import APIRouter, Body, Path, BackgroundTasks, Depends
from typing import List
import logging
import time
import random

from service.recommend_service import predict_personal_cocktail, predict_similar_cocktail
from models.dto.data_class import PersonalcocktailRequest
from common.context.ItemFeatures import ItemFeatures


rec = APIRouter(
    tags=["rec"],
    responses={404: {"description": "Page Not found"}},
)


async def retrain_model():
    time.sleep(5)
    print("after sleep")
    if random.randint(0, 1) == 0:
        return "zero"
    else:
        return "one"


@rec.post("/personal-cocktail", status_code=200)
async def rec_personal_cocktail(
        personal_cocktail_request: PersonalcocktailRequest = Body(...),
        item_features: ItemFeatures = Depends(ItemFeatures),
):

    logging.info(
        "실제 사용자 : {}\n추천 조회 id : {}\nPreference : {}".format(
            personal_cocktail_request.user_id,
            personal_cocktail_request.preferences[0].user_id,
            personal_cocktail_request.preferences[0],
        )
    )
    return predict_personal_cocktail(
        personal_cocktail_request.preferences, item_features.data
    )


# 오늘의 칵테일과 유사한 칵테일 추천결과 반환
@rec.get("/today/{cocktailId}", status_code=200)
async def rec_similar_cocktail(
        # cocktail_id 값이 1 이상이어야 한다는 조건 ge
        cocktail_id: int = Path(..., ge=1),
        # ItemFeatures 클래스의 인스턴스를 생성하고, 이를 item_features 인자로 제공
        item_features: ItemFeatures = Depends(ItemFeatures),
):
    logging.info("cocktail id : {}".format(cocktail_id))
    return predict_similar_cocktail(cocktail_id, item_features.data)


# 유저별 맞춤 추천 칵테일 추천결과 반환
# @rec.get("/api/v1/recommend/personal/{memberId}", status_code=200)
# async def rec_similar_cocktail(
#         member_id: int = Path(..., ge=1),
#         item_features: ItemFeatures = Depends(ItemFeatures),
# ):
#     logging.info("cocktail id : {}".format(member_id))
#     return predict_similar_cocktail(member_id, item_features.data)


@rec.get("/async/", status_code=202)
async def rec_async(background_tasks: BackgroundTasks):
    a = 0
    print(a)
    return background_tasks.add_task(retrain_model)