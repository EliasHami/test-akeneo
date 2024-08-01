import { useEffect, useState } from "react";
import "./App.css";
import { Participant } from "./types";
import { getParticipants } from "./api";

function App() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const data = await getParticipants();
      setParticipants(data);
    };

    fetchParticipants();
  }, []);

  return (
    <div>
      <h1>Participants</h1>
      <div className="container">
        {participants.map((participant) => (
          <div key={participant.id}>{participant.name}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
