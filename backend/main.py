from typing import Union
from models import Base, Participant
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from fastapi import FastAPI, Depends
from schema import ParticipantCreate

Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@app.get("/participants")
def participants(db: Session = Depends(get_db)):
    participants = db.query(Participant).all()
    return participants


@app.post("/participant")
def participants(participant_data: ParticipantCreate, db: Session = Depends(get_db)):
    participant = Participant(
        name=participant_data.name,
        gift=participant_data.gift,
        blacklist=participant_data.blacklist,
    )
    db.add(participant)
    db.commit()
    db.refresh(participant)
    return participant
