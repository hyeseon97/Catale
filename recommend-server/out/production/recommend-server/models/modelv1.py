import pickle
import os
import pandas as pd
import numpy as np

from scipy.sparse import coo_matrix, csr_matrix

from lightfm import LightFM

# os.getcwd()

whisky = pd.read_csv("./save/cocktail_features.csv", index_col=0 , encoding="UTF-8")
rating = pd.read_csv("./save/test_ratings.csv", index_col=0, encoding="UTF-8")


# Load the saved model
with open('origin_user_rating_model.pkl', 'rb') as f:
    model = pickle.load(f)
def sample_recommendation(model, data, user_id, item_features, cost_rank, k = 9):


    n_items = item_features.shape[0]

    scores = model.predict(user_ids=user_id, item_ids=np.arange(n_items), item_features=item_features)
    #     top_items = data[]
    print(np.argsort(-scores))
    return np.argsort(-scores)
#     for user_id in user_ids:
#         known_positives = data['item_labels'][data['train'].tocsr()[user_id].indices]

#         scores = model.predict(user_id, np.arange(n_items))
#         top_items = data['item_labels'][np.argsort(-scores)]

#         print("User %s" % user_id)
#         print("     Known positives:")

#         for x in known_positives[:3]:
#             print("        %s" % x)

#         print("     Recommended:")

#         for x in top_items[:3]:
#             print("        %s" % x)

# sample_recommendation(model, data, [3, 25, 450])
def get_item_features(data):
    columns = data.columns.tolist()
    columns = [columns[8]] + columns[11:]
    item_features = np.zeros((data['whisky_id'].nunique(), len(columns)))
    for i in range(data['whisky_id'].nunique()):
        for j, col_name in enumerate(columns):
            item_features[i, j] = data.iloc[i][col_name]
    return csr_matrix(item_features)
    # item_features = csr_matrix(item_features)
item_features = get_item_features(whisky)
print(item_features)