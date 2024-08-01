from typing import Union
from models import Base, Participant, Draw
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from fastapi import FastAPI, Depends
from schema import ParticipantCreate
from datetime import datetime

Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@app.get("/participants")
def get_participants(db: Session = Depends(get_db)):
    participants = db.query(Participant).all()
    return participants


@app.post("/participant")
def create_participant(
    participant_data: ParticipantCreate, db: Session = Depends(get_db)
):
    participant = Participant(
        name=participant_data.name,
        gift=participant_data.gift,
        blacklist=participant_data.blacklist,
    )
    db.add(participant)
    db.commit()
    db.refresh(participant)
    return participant


@app.post("/draw/start")
def start_draw(db: Session = Depends(get_db)):
    participants = db.query(Participant.name).all()
    if len(participants) < 2:
        return "Not enough participants"

    draw = Draw(
        date=datetime.now(),
        participants=[name[0] for name in participants],
        draws=[],
    )
    db.add(draw)
    db.commit()
    db.refresh(draw)
    return draw


@app.get("/draws/last_five")
def get_last_fice_draws(db: Session = Depends(get_db)):
    draws = db.query(Draw).limit(5).all()
    return draws
