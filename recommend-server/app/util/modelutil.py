import logging
import pickle
import pandas as pd
import re

from common.config import settings
from lightfm import LightFM
from lightfm.data import Dataset
from models.dto.data_class import Preference


def load_rec_model():
    return pickle.load(open(settings.MODEL_PATH + settings.MODEL_NAME, "rb"))


def load_dataset():
    return pickle.load(open(settings.DATASET_PATH + settings.DATASET_NAME, "rb"))


# 사용자의 평점 데이터를 입력으로 받아, pandas 데이터프레임을 생성
def make_rating_df(ratings):
    return pd.DataFrame(
        [
            (rating.user_id + settings.N_USERS, rating.cocktail_id, rating.rating)
            for rating in ratings
        ],
        columns=["user_id", "cocktail_id", "rating"],
    )


# 사용자의 선호도 정보(Preference 객체 리스트)를 데이터프레임으로 변환
def make_user_features_df(preference):
    preference_df = pd.DataFrame([p.__dict__ for p in preference])
    preference_df["user_id"] = preference_df["user_id"].apply(
        lambda x: x + settings.N_USERS if x != 0 else 0
    )
    return preference_df

# 데이터프레임을 입력으로 받아, LightFM 모델의 사용자 또는 아이템 특성을 생성하는 데 사용할 수 있는 소스 데이터를 생성
def make_source(data):
    source = []
    for row in data.itertuples(index=False):
        meta = {feat: value for feat, value in zip(data.columns[1:], row[1:])}
        source.append((row[0], meta))
    return source

# 사용자-아이템 상호작용 데이터를 입력으로 받아, LightFM 모델에서 사용할 상호작용 데이터를 생성
def make_interactions(rating_df, dataset):
    dataset = Dataset()

    rating_source = list(
        zip(rating_df["user_id"], rating_df["cocktail_id"], rating_df["rating"])
    )
    logging.info("modelutil_rating_source")
    logging.info("rating_source")
    logging.info(rating_source)
    return dataset.build_interactions(rating_source)

# 사용자와 아이템의 메타데이터를 바탕으로 특성을 생성
def make_features(preference_df, item_features, dataset):
    # make user features
    preference_source = make_source(preference_df)
    logging.info("preferencesource")
    logging.info(preference_source)
    # preference_meta = dataset.build_user_features(
    #     preference_source)
    dataset = Dataset()
    logging.info("modelutil_dataset")
    logging.info(dataset)
    preference_meta = dataset.build_user_features(preference_source, normalize=False)

    # make item features
    # item_features = item_features[
    #     "cocktail_id" + item_features.columns.tolist()[3:]
    #     ]
    item_features = item_features[['cocktail_id'] + item_features.columns.tolist()[3:]]
    logging.info("modelutil 69줄")
    logging.info(item_features)
    item_source = make_source(item_features)
    item_meta = dataset.build_item_features(item_source, normalize=False)
    return preference_meta, item_meta



#-----------------------------데이터 업데이트 관련-----------------------------------------------------------------



# 새로운 평점/사용자 특성 데이터를 기존 데이터와 결합하고, 중복을 제거
def concat_ratings(rating_df):
    ratings = pd.read_csv(settings.RATING_FILE,
                          index_col=0, encoding=settings.ENCODING)
    ratings = pd.concat([ratings, rating_df], ignore_index=True)
    ratings.drop_duplicates(
        subset=["user_id", "cocktail_id"], keep="last", inplace=True)
    return ratings


def concat_user_features(user_features_df):
    user_features = pd.read_csv(
        settings.USER_FEATURES_FILE, index_col=0, encoding=settings.ENCODING
    )
    user_features = pd.concat(
        [user_features, user_features_df], ignore_index=True)
    user_features.drop_duplicates(
        subset=["user_id"], keep="last", inplace=True)
    return user_features

# 변경된 모델/데이터셋을 파일 시스템에 업데이트
def update_model(model, path):
    logging.debug("catale_model.pkl is updated")
    with open(path, "wb") as f:
        pickle.dump(model, f)


def update_dataset(dataset, path):
    logging.debug("catale_dataset.pkl is updated")
    with open(path, "wb") as f:
        pickle.dump(dataset, f)

# 백업 파일의 경로를 생성
def create_backup_path(file, extension, date):
    time = date.split(".")[0]
    time = re.sub(":", "_", time)
    return settings.BACKUP_PATH + file + "_" + time + "." + extension