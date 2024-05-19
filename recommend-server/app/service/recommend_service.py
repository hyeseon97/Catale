from typing import List

import numpy as np
# 항목 간 유사도 측정에 사용
from sklearn.metrics.pairwise import cosine_similarity
# 희소 행렬을 CSR(Compressed Sparse Row) 형식으로 표현
from scipy.sparse import csr_matrix
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from service.retrain_service import dataset_fit
import logging

from lightfm import LightFM
from lightfm.data import Dataset

# 데이터 구조
from models.dto.data_class import Preference
from common.config import settings
from util.modelutil import (
    load_rec_model,
    load_dataset,
    make_features,
    make_user_features_df,
)


# 사용자의 선호도(preferences)와 아이템 특성(item_features)을 바탕으로 개인화된 칵테일 추천 생성
# def predict_personal_cocktail(preferences: List[Preference], item_features):
#     # 추천 모델과 데이터셋을 로드
#     dataset = Dataset()
#     model = load_rec_model()
#     dataset = load_dataset()
#     logging.info("dataset:")
#     logging.info(dataset)
#     logging.info("item_features:")
#     logging.info(item_features)
#     logging.info("preferences:")
#     logging.info(preferences)
    

#     user_id = preferences[0].user_id
#     item_ids = np.arange(item_features.shape[0])
#     users_id = np.full_like(item_ids, user_id)
#     item_feat = item_features[item_features.columns.tolist()[1:]]
#     logging.info("item_feat:")
#     logging.info(item_feat)
#     # logging.info("item_feat")
#     # logging.info(item_feat)
#     # dataset.fit(users_id, item_ids, item_features=['alc','sweet','sour','bitter','sparking'])
#     # cols = preferences.tolist()[0:]
#     dataset = dataset_fit(
#         users=np.arange(users_id.max() + 1),
#         items=np.arange(item_features.cocktail_id.max() + 1),
#         cols=[5],
#     )
#     # # dataset = load_dataset()

#     # logging.info("rec_service_dataset")
#     # logging.info(dataset)

#     # # 사용자의 선호도에서 사용자 특성 데이터프레임을 생성
#     preference_df = make_user_features_df(preferences)
#     logging.info("preference_df:")
#     logging.info(preference_df)
#     # # 사용자 메타데이터(user_meta)와 아이템 메타데이터(item_meta)를 생성

#     user_meta, item_meta = make_features(preference_df, item_features, dataset)
#     # user_meta = dataset.build_user_features(data=preference_df, normalize=False)
#     logging.info("user_meta:")
#     logging.info(user_meta)
#     # item_meta = dataset.build_item_features(item_features, normalize=False)
#     logging.info("item_meta:")
#     logging.info(item_meta)
#     # item_ids = np.arange(item_features.shape[0])

#     # # user_meta, item_meta = make_features(preference_df, item_features, dataset)
#     # item_meta = dataset.build_item_features(item_source)
#     # user_meta = dataset.build_user_features()
#     # logging.info("user_meta")
#     # logging.info(user_meta)
#     # logging.info("item_meta")
#     # logging.info(item_meta)

#     # # 아이템의 개수만큼의 연속된 정수 배열 생성 
#     item_ids = np.arange(item_feat.shape[0])
#     logging.info("item_ids:")
#     logging.info(item_ids)
#     # logging.info("item_ids")
#     # logging.info(item_ids)

#     # 모든 아이템에 대한 사용자의 예측 점수를 계산
#     scores = model.predict(
#         user_ids=preferences[0].user_id,
#         # if preferences[0].user_id == 0
#         # else settings.N_USERS + preferences[0].user_id,
#         item_ids=item_ids,
#         user_features=user_meta,
#         item_features=item_meta,
#     )
#     # 계산된 점수를 내림차순으로 정렬하고, 상위 N개의 아이템 인덱스를 리스트로 반환
#     return np.argsort(-scores).tolist()


# def predict_personal_cocktail(preferences: List[Preference], item_features):
#     model = load_rec_model()
#     dataset = load_dataset()
#     preference_df = make_user_features_df(preferences)
#     user_meta, item_meta = make_features(preference_df, item_features, dataset)
#     item_ids = np.arange(item_features.shape[0])
#     scores = model.predict(
#         user_ids=preferences[0].user_id
#         if preferences[0].user_id == 0
#         else settings.N_USERS + preferences[0].user_id,
#         item_ids=item_ids,
#         user_features=user_meta,
#         item_features=item_meta,
#     )
#     return np.argsort(-scores).tolist()

def predict_personal_cocktail(user_id: int, item_features):
    model = load_rec_model()

    u_i_scores = model.predict(user_id, item_ids=item_features.cocktail_id.unique())
    u_i_scores
    u_i_result = np.argsort(-u_i_scores).tolist()[:10]
    return u_i_result

def predict_similar_cocktail(cocktail_id: int, item_features, k: int = 5):
    # item_features 데이터프레임에서 숫자형 특성만을 추출
    item_feat = item_features[item_features.columns.tolist()[1:]]
    # 추출된 아이템 특성을 CSR 행렬로 변환하여 메모리 효율 높임
    item_matrix = csr_matrix(item_feat)
    # 코사인 유사도 계산
    cosine_sim = cosine_similarity(item_matrix, item_matrix)

    # 해당 아이템과의 유사도 반환
    scores = cosine_sim[cocktail_id]

    # 유사도 점수를 내림차순으로 정렬하고, 가장 유사한 k개의 위스키 ID를 리스트로 반환
    logging.debug(
        "cocktail id : {} result index : {}".format(
            cocktail_id, np.argsort(-scores)[1 : k + 1].tolist()
        )
    )
    return np.argsort(-scores)[1 : k + 1].tolist()



def user_recommend_cocktail(cocktail_features: List[int], item_features, k: int = 10):
   # 입력된 특성 정보를 DataFrame으로 변환
    logging.info(item_features.columns.tolist()[1:])
    logging.info(len(cocktail_features))
    logging.info(len(item_features.columns.tolist()[1:]))
    input_features_df = pd.DataFrame([cocktail_features], columns=item_features.columns.tolist()[1:])
    
    logging.info("1")
    # item_features 데이터프레임에서 숫자형 특성만을 추출
    item_feat = item_features[item_features.columns.tolist()[1:]]
    logging.info("2")
    
    # 입력된 칵테일 특성과 item_features의 모든 칵테일 특성 사이의 코사인 유사도 계산
    cosine_sim = cosine_similarity(input_features_df, item_feat)
    logging.info("3")
    
    # 첫 번째 행(입력된 칵테일 특성)에 대한 유사도 점수를 기반으로 유사도가 높은 상위 k개의 칵테일 인덱스 추출
    # argsort()는 작은 값부터 정렬하므로, -cosine_sim[0]을 사용하여 큰 값부터 정렬
    top_indices = np.argsort(-cosine_sim[0])[:k]
    
    # 인덱스를 사용하여 가장 유사한 k개의 칵테일 ID 추출
    similar_cocktails = item_features.iloc[top_indices]['cocktail_id'].tolist()
    
    return similar_cocktails
