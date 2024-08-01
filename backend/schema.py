from pydantic import BaseModel


class ParticipantSchema(BaseModel):
    id: int
    name: str
    gift: str
    blacklist: list[str]


class ParticipantCreate(BaseModel):
    name: str
    gift: str
    blacklist: list[str]
