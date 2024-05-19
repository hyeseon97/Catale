from fastapi import APIRouter, Body, Path, BackgroundTasks, Depends
from typing import List
import logging
import time
import random

from service.recommend_service import predict_personal_cocktail, predict_similar_cocktail, user_recommend_cocktail
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

# user_id 1~10 
@rec.get("/personal/{user_id}", status_code=200)
async def rec_personal_cocktail(
        user_id: int,
        item_features: ItemFeatures = Depends(ItemFeatures),
):
    logging.info("personal rec router 진입")
    
    return predict_personal_cocktail(
        user_id, item_features.data
    )


# 오늘의 칵테일과 유사한 칵테일 추천결과 반환
@rec.get("/today/{cocktail_id}", status_code=200)
async def rec_similar_cocktail(
        # cocktail_id 값이 1 이상이어야 한다는 조건 ge
        cocktail_id: int = Path(..., ge=1),
        # ItemFeatures 클래스의 인스턴스를 생성하고, 이를 item_features 인자로 제공
        item_features: ItemFeatures = Depends(ItemFeatures),
):
    logging.info("cocktail id : {}".format(cocktail_id))
    return predict_similar_cocktail(cocktail_id, item_features.data)


# # user_id 11 이상 
@rec.post("/personal", status_code=200)
async def rec_user_cocktail(
        numbers: List[int],
        item_features: ItemFeatures = Depends(ItemFeatures),
):
    logging.info(numbers)
    return user_recommend_cocktail(numbers, item_features.data)


@rec.get("/async/", status_code=202)
async def rec_async(background_tasks: BackgroundTasks):
    a = 0
    print(a)
    return background_tasks.add_task(retrain_model)