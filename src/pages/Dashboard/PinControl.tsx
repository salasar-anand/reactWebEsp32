// components/ESP32/PinControl.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

interface PinControlProps {
  pinNumber: number;
}

const PinControl: React.FC<PinControlProps> = ({ pinNumber }) => {
  const [mode, setMode] = useState<"input" | "output">("output");
  const [value, setValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const apiBase = "https://nodeesp32.onrender.com";

  const fetchPinData = () => {
    axios
      .get(`${apiBase}/api/pin/${pinNumber}`)
      .then((res) => {
        setMode(res.data.mode);
        if (res.data.value !== null) setValue(res.data.value);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pin state:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPinData();
    const interval = setInterval(fetchPinData, 2000);
    return () => clearInterval(interval);
  }, [pinNumber]);

  const updatePin = (newMode: "input" | "output", newValue: number | null) => {
    const payload: any = { mode: newMode };
    if (newMode === "output") {
      payload.value = newValue;
    }

    axios
      .post(`${apiBase}/api/pin/${pinNumber}`, payload)
      .then(() => {
        setMode(newMode);
        if (newMode === "output" && newValue !== null) {
          setValue(newValue);
        }
      })
      .catch((err) => console.error("Error updating pin state:", err));
  };

  const toggleValue = () => {
    const newVal = value ? 0 : 1;
    updatePin(mode, newVal);
  };

  const handleModeChange = (newMode: "input" | "output") => {
    updatePin(newMode, newMode === "output" ? value : null);
  };

  return (
    <div className="border p-4 rounded shadow bg-white dark:bg-boxdark space-y-2">
      <h3 className="text-lg font-semibold">Pin {pinNumber}</h3>

      <select
        className="w-full p-2 border rounded"
        onChange={(e) => handleModeChange(e.target.value as "input" | "output")}
        value={mode}
      >
        <option value="input">Input</option>
        <option value="output">Output</option>
      </select>

      {mode === "output" && (
        <button
          className={`w-full p-2 rounded text-white ${
            value ? "bg-red-500" : "bg-green-500"
          }`}
          onClick={toggleValue}
        >
          {value ? "Turn OFF" : "Turn ON"}
        </button>
      )}

      {mode === "input" && (
        <div className="text-center text-sm text-gray-700">
          {loading ? "Reading..." : `Input value: ${value}`}
        </div>
      )}
    </div>
  );
};

export default PinControl;
