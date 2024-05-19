from fastapi import Body
from pydantic import BaseModel
from typing import List
import pandas as pd


class Preference(BaseModel):
    user_id: int = Body(..., alias="memberId")
    alc: float = Body(..., ge=0, le=1)
    sweet: float = Body(..., ge=0, le=1)
    sour: float = Body(..., ge=0, le=1)
    bitter: float = Body(..., ge=0, le=1)
    sparking: float = Body(..., ge=0, le=1)


class Rating(BaseModel):
    user_id: int = Body(..., alias="memberId")
    cocktail_id: int = Body(..., alias="cocktailId", ge=1)
    rating: int = Body(...)


class PersonalcocktailRequest(BaseModel):
    user_id: int = Body(..., alias="memberId")
    preferences: List[Preference] = Body(..., alias="preferenceDtoList")


class MemberData(BaseModel):
    time: str = None
    ratings: List[Rating] = Body(..., alias="ratings")
    preferences: List[Preference] = Body(...)


class ModelResult(BaseModel):
    savedDateTime: str
    precision: float
    recall: float
    auc: float
    mrr: float