from sqlalchemy import Column, Integer, String, ARRAY, Date, Enum
from database import Base


class Participant(Base):
    __tablename__ = "participant"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    gift = Column(String)
    blacklist = Column(ARRAY(String))


class Draw(Base):
    __tablename__ = "draw"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date)
    participants = Column(ARRAY(String))
    draws = Column(ARRAY(String))
