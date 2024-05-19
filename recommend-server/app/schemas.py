from pydantic import BaseModel

class ItemBase(BaseModel):
    name: str
    description: str
    price: int

# 데이터 추가를 위한 요청 스키마
class ItemCreate(ItemBase):
    pass

# 데이터 추가를 위한 요청 스키마
class ItemGet(ItemBase):
    id: int


    class Config:
        orm_mode = True