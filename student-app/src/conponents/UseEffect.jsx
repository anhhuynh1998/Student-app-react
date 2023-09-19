import React, { useState } from "react";
import Content from "./Content";

const UseEffect = () => {
    const [toggle,setToggle] = useState(false)
    return (
        <div className="container">
            <button className='btn btn-sm btn-primary'
                onClick={() => setToggle(!toggle)}
            >Toggle Content</button>

            {toggle && <Content />}
        </div>
    )
}
export default UseEffect;