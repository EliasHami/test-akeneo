import { useEffect, useState } from "react";

import "./App.css";
import { Draw, Participant } from "./types";
import {
  addParticipant,
  get_last_five_draws,
  getParticipants,
  start_draw,
} from "./api";
import { parse, parseISO } from "date-fns";

function App() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [name, setName] = useState("");
  const [gift, setGift] = useState("");
  const [blacklist, setBlacklist] = useState<number[]>([]);
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);
  const [drawResult, setDrawResult] = useState<Draw[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const data = await getParticipants();
      setParticipants(data);
    };

    const fetchDraws = async () => {
      const results = await get_last_five_draws();
      setDrawResult(results);
    };

    fetchParticipants();
    fetchDraws();
  }, []);

  const handleAddParticipant = async () => {
    await addParticipant({ name, gift, blacklist });
    const data = await getParticipants();
    setParticipants(data);
    setName("");
    setGift("");
    setBlacklist([]);
  };

  const handleAddToBlacklist = () => {
    if (selectedParticipant) {
      setBlacklist([...blacklist, selectedParticipant.id]);
      setSelectedParticipant(null);
    }
  };

  const handleStartDraw = async () => {
    await start_draw();
    const results = await get_last_five_draws();
    setDrawResult(results);
  };

  return (
    <div>
      <h1>Participants</h1>
      <div className="container">
        {participants.map((participant) => (
          <div className="participant" key={participant.id}>
            {participant.id}. {participant.name}
          </div>
        ))}
        <div className="form">
          <div className="formfield">
            <label htmlFor="participantName">Name</label>
            <input
              id="participantName"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="formfield">
            <label htmlFor="participantGift">Gift</label>
            <input
              id="participantGift"
              type="text"
              placeholder="Gift"
              value={gift}
              onChange={(e) => setGift(e.target.value)}
            />
          </div>
          <div className="formfield">
            <label htmlFor="participantBlacklist">Blacklist</label>
            <select
              id="participantBlacklist"
              value={selectedParticipant?.id || ""}
              onChange={(e) => {
                console.log({ val: e.target.value, participants });
                setSelectedParticipant(
                  participants.find((p) => p.id === Number(e.target.value)) ||
                    null
                );
              }}
            >
              <option value="">Select participant</option>
              {participants.map((participant) => (
                <option key={participant.id} value={participant.id}>
                  {participant.name}
                </option>
              ))}
            </select>
            <button className="button" onClick={handleAddToBlacklist}>
              +
            </button>
          </div>
          <div>Blacklisted :{blacklist.join(", ")}</div>
          <button
            disabled={!name || !gift || blacklist.length === 0}
            className="button"
            onClick={handleAddParticipant}
          >
            Add Participant
          </button>
        </div>
        <button
          disabled={participants.length < 2}
          className="button"
          onClick={handleStartDraw}
        >
          Start a draw
        </button>
        <hr className="solid" />
        <div>
          <h3> 5 last results :</h3>
          {drawResult.map((draw) => (
            <div key={draw.id}>
              <hr className="solid" />
              {parseISO(draw.date).toString()}
              <div>
                {draw.draws.map((d) => (
                  <div key={d[0]}>
                    {d[0]} -&gt; {d[1]}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
