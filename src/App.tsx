import React from "react";
import ScatterChart from "./ScatterChart";

const data = [
    { x: 1982, y: 125, label: "label1" },
    { x: 1987, y: 257, label: "label2" },
    { x: 1993, y: 345, label: "label3" },
    { x: 1997, y: 515, label: "label4" },
    { x: 2001, y: 132, label: "label5" },
    { x: 2005, y: 305, label: "label6" },
    { x: 2011, y: 270, label: "label7" },
    { x: 2015, y: 470, label: "label8" }
];

function App() {
    return (
        <ScatterChart data={data}/>
    );
}

export default App;
