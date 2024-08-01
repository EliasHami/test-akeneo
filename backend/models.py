from sqlalchemy import Column, Integer, String, ARRAY
from database import Base


class Participant(Base):
    __tablename__ = "participant"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    gift = Column(String)
    blacklist = Column(ARRAY(String))
