from typing import List

import numpy as np
# 항목 간 유사도 측정에 사용
from sklearn.metrics.pairwise import cosine_similarity
# 희소 행렬을 CSR(Compressed Sparse Row) 형식으로 표현
from scipy.sparse import csr_matrix

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


# 사용자의 선호도(preferences)와 아이템 특성(item_features)을 바탕으로 개인화된 위스키 추천 생성
def predict_personal_cocktail(preferences: List[Preference], item_features):
    # 추천 모델과 데이터셋을 로드
    model = load_rec_model()
    dataset = load_dataset()
    # 사용자의 선호도에서 사용자 특성 데이터프레임을 생성
    preference_df = make_user_features_df(preferences)
    # 사용자 메타데이터(user_meta)와 아이템 메타데이터(item_meta)를 생성
    user_meta, item_meta = make_features(preference_df, item_features, dataset)
    item_ids = np.arange(item_features.shape[0])
    # 모든 아이템에 대한 사용자의 예측 점수를 계산
    scores = model.predict(
        user_ids=preferences[0].user_id
        if preferences[0].user_id == 0
        else settings.N_USERS + preferences[0].user_id,
        item_ids=item_ids,
        user_features=user_meta,
        item_features=item_meta,
    )
    # 계산된 점수를 내림차순으로 정렬하고, 상위 N개의 아이템 인덱스를 리스트로 반환
    return np.argsort(-scores).tolist()


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