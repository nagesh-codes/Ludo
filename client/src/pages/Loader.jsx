import React from 'react'
import '../css-files/Loader.css'

const Loader = ({ text = "Loading.." }) => {
    return (
            <div className="loading-container">
                <div className="loader-con">
                    <div className="pfile" style={{ '--i': 0 }}></div>
                    <div className="pfile" style={{ '--i': 1 }}></div>
                    <div className="pfile" style={{ '--i': 2 }}></div>
                    <div className="pfile" style={{ '--i': 3 }}></div>
                    <div className="pfile" style={{ '--i': 4 }}></div>
                    <div className="pfile" style={{ '--i': 5 }}></div>
                </div>
                <div className="loading-txt">{text}</div>
            </div>
    )
}

export default Loader
