import { useEffect, useState } from "react";
import "./App.css";
import { Participant } from "./types";
import { addParticipant, getParticipants } from "./api";

function App() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [name, setName] = useState("");
  const [gift, setGift] = useState("");
  const [blacklist, setBlacklist] = useState<number[]>([]);
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      const data = await getParticipants();
      setParticipants(data);
    };

    fetchParticipants();
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
    }
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
            disabled={!name || !gift}
            className="button"
            onClick={handleAddParticipant}
          >
            Add Participant
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
