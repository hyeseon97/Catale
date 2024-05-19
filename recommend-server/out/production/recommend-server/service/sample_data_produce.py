import numpy as np
import pandas as pd
import os

# 설정
num_users = 100  # 사용자 수
num_cocktails = 50  # 칵테일 수
num_reviews = 1000  # 리뷰 수

# 사용자 취향 특성 생성 (단맛, 신맛, 쓴맛, 도수, 탄산감에 대한 선호도)
user_preferences = np.random.rand(num_users, 5)

# 칵테일 특성 생성 (단맛, 신맛, 쓴맛, 도수, 탄산감)
item_features = np.random.rand(num_cocktails, 5)

# 리뷰 데이터 생성
user_ids = np.random.randint(0, num_users, num_reviews)
cocktail_ids = np.random.randint(0, num_cocktails, num_reviews)
ratings = []

for user_id, cocktail_id in zip(user_ids, cocktail_ids):
    user_pref = user_preferences[user_id]
    cocktail_feat = item_features[cocktail_id]
    # 평점 계산 과정에서 정수 범위를 유지합니다.
    rating = np.dot(user_pref, cocktail_feat) / (np.linalg.norm(user_pref) * np.linalg.norm(cocktail_feat))
    rating = 1 + (rating * 4)
    rating = np.clip(rating, 1, 5)
    ratings.append(int(round(rating)))  # 평점을 반올림하여 정수로 변환

# 데이터 프레임 생성
reviews_df = pd.DataFrame({
    'user_id': user_ids,
    'cocktail_id': cocktail_ids,
    'rating': np.round(ratings, 1)
})

user_preferences_df = pd.DataFrame(user_preferences, columns=['sweet', 'sour', 'bitter', 'alcohol', 'carbonation'])
user_preferences_df.index.name = 'user_id'

item_features_df = pd.DataFrame(item_features, columns=['sweet', 'sour', 'bitter', 'alcohol', 'carbonation'])
item_features_df.index.name = 'cocktail_id'

# 리뷰 데이터를 70:30 비율로 훈련 데이터와 테스트 데이터로 분리합니다.

# 분리할 인덱스 계산
split_idx = int(len(reviews_df) * 0.7)

# 데이터를 무작위로 섞습니다.
shuffled_indices = np.random.permutation(len(reviews_df))
train_indices = shuffled_indices[:split_idx]
test_indices = shuffled_indices[split_idx:]

# 훈련 데이터와 테스트 데이터로 분리
train_df = reviews_df.iloc[train_indices]
test_df = reviews_df.iloc[test_indices]

# 파일 저장 경로 설정
save_dir = '../models/save/'

# 디렉토리가 없으면 생성
if not os.path.exists(save_dir):
    os.makedirs(save_dir)

# 데이터 프레임을 CSV 파일로 저장
# 훈련 데이터와 테스트 데이터를 CSV 파일로 저장
train_df.to_csv(save_dir + 'train_ratings.csv', index=False)
test_df.to_csv(save_dir + 'test_ratings.csv', index=False)
user_preferences_df.to_csv(save_dir + 'user_preferences.csv')
item_features_df.to_csv(save_dir + 'item_features.csv')

print("Files saved successfully.")

