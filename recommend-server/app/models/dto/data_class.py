from fastapi import Body
from pydantic import BaseModel
from typing import List
import pandas as pd


class Preference(BaseModel):
    user_id: int = Body(..., alias="memberId")
    alc: int = Body(..., ge=0, le=5)
    sweet: int = Body(..., ge=0, le=5)
    sour: int = Body(..., ge=0, le=5)
    bitter: int = Body(..., ge=0, le=5)
    sparking: int = Body(..., ge=0, le=5)

class UserPreference(BaseModel):
    alc: int = Body(..., ge=0, le=5)
    sweet: int = Body(..., ge=0, le=5)
    sour: int = Body(..., ge=0, le=5)
    bitter: int = Body(..., ge=0, le=5)
    sparking: int = Body(..., ge=0, le=5)


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