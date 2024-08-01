from typing import Union
from models import Base, Participant, Draw
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from fastapi import FastAPI, Depends
from schema import ParticipantCreate
from datetime import datetime
import random
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@app.get("/participants")
def get_participants(db: Session = Depends(get_db)):
    participants = db.query(Participant).order_by(Participant.id).all()
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


def get_draws(participants):
    # potential partners for each participant
    potential_partners = {}
    for participant in participants:
        if participant.blacklist:
            potential_partners[participant.name] = [
                p
                for p in participants
                if p.name != participant.name and p.id not in participant.blacklist
            ]
        else:
            potential_partners[participant.name] = [
                p for p in participants if p.name != participant.name
            ]
    draws = []
    for participant in participants:
        if potential_partners[participant.name]:
            # select random partner
            draw = random.choice(potential_partners[participant.name])
            draws.append((participant.name, draw.gift))
            # Remove to avoid duplicate draws
            for key in potential_partners:
                potential_partners[key] = [
                    item for item in potential_partners[key] if item.id != draw.id
                ]
        else:
            # no valid draw is possible
            print(
                f"No valid draw for {participant.name}. Consider revising the blacklist."
            )

    return draws


@app.post("/draw/start")
def start_draw(db: Session = Depends(get_db)):
    participants = db.query(Participant).all()
    if len(participants) < 2:
        return "Not enough participants"

    draws = get_draws(participants)
    draw = Draw(
        date=datetime.now(),
        participants=[p.name for p in participants],
        draws=draws,
    )
    db.add(draw)
    db.commit()
    db.refresh(draw)
    return draw


@app.get("/draws/last_five")
def get_last_fice_draws(db: Session = Depends(get_db)):
    draws = db.query(Draw).order_by(Draw.date.desc()).limit(5).all()
    return draws
