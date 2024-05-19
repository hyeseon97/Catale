import numpy as np
from numpy.linalg import norm

# 아이템의 속성 값을 나타내는 배열 예시입니다.
items = np.array([
    [5, 3, 4, 2, 1],  # 아이템 1
    [4, 5, 5, 3, 2],  # 아이템 2
    [1, 1, 2, 4, 5],  # 아이템 3
    [2, 2, 3, 4, 4],  # 아이템 4
    [5, 4, 4, 3, 2],  # 비교 대상 아이템
    [4, 4, 3, 2, 1],  # 추가 아이템
    [3, 5, 4, 1, 3],  # 추가 아이템
    [4, 3, 4, 2, 2],  # 추가 아이템
    [5, 2, 1, 4, 3],  # 추가 아이템
])

# 비교하고자 하는 아이템의 속성 값입니다.
target_item = items[4]

# 코사인 유사도를 계산하는 함수입니다.
def cosine_similarity(item1, item2):
    return np.dot(item1, item2) / (norm(item1) * norm(item2))

# 각 아이템과 대상 아이템의 코사인 유사도를 계산합니다.
similarities = [cosine_similarity(target_item, item) for item in items]

# 유사도와 아이템 인덱스를 함께 저장합니다.
similarity_indices = list(enumerate(similarities))

# 자기 자신을 유사도 비교에서 제외하고, 유사도가 높은 순으로 정렬합니다.
similarity_indices = sorted(similarity_indices, key=lambda x: x[1], reverse=True)[1:]

# 상위 5개의 가장 유사한 아이템을 출력합니다.
print("가장 유사한 아이템 상위 5개:")
for i in range(5):
    index, similarity = similarity_indices[i]
    print(f"{i+1}위: 아이템 {index + 1} (유사도: {similarity:.2f})")
