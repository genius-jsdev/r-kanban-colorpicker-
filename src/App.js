import React, { useState } from 'react'
import Kanban from './Kanban'
// import ColorPicker from 'react-color-picker'
// import 'react-color-picker/index.css'
// import { SketchPicker } from 'react-color';


export default function App() {
    // const [color, setColor] = useState('fff');

    // function onChange(color) {
    //     console.log(color);
    //     setColor(color);
    // }

    // const handleChangeComplete = (color) => {
    //     setColor(color.hex);
    // }

    return (
        <div>
            <Kanban />
            {/* <ColorPicker value={color} onChange={onChange.bind(this)} /> */}
            {/* <div style={{
                background: color,
                width: 100,
                height: 50,
                color: 'white'
            }}>
                {color}
            </div>
            <div style={{ display: "none", position: "absolute" }}>
                <SketchPicker
                    color={color}
                    onChangeComplete={handleChangeComplete}
                    
                />
            </div> */}
        </div>
    );
}