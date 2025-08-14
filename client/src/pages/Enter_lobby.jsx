import '../css-files/Enter_lobby.css'

const Enter_lobby = () => {
    return (
        <>
            <div className="enter-lobby">
                <div className="wrapper">
                    <div className="main-heading">Welcome To <span>Ludo</span> Made By Nagesh</div>
                    <div className="info">How You Want To Play</div>
                    <div className="offline">
                        <h2>Offline</h2>
                        <div className="more-info">Read More Aboute Offline Mode.</div>
                    </div>
                    <div className="online">
                        <h2>Online</h2>
                        <div className="more-info">Read More Aboute Online Mode.</div>
                    </div>
                    <div className="creator">Know More About This Website Creator</div>
                </div>
            </div>
        </>
    )
}

export default Enter_lobby
