import React, { useEffect, useState } from 'react'
import '../css-files/Join_Room.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSocket } from '../components/socketProvider';
import { toast } from 'react-toastify';

const Join_Room = () => {
    const [username, setUsername] = useState('');
    const [clr, setClr] = useState('red');
    const [roomID, setRoomID] = useState('');
    const navigate = useNavigate();
    const [txt, setTxt] = useState('Enter RoomID Provided By Your Friend.');
    const { roomid } = useParams();
    const [disableBtn, setDisableBtn] = useState(false);
    const [checkingRoomId, setCheckingRoomId] = useState(true);
    const { socket, connected } = useSocket();
    const [colors, setColors] = useState(['red', 'blue', 'yellow', 'green']);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkingRoomId) {
            toast.warn('please wait We Are Checking Your RoomId');
            return;
        }
        sessionStorage.setItem('roomid', roomID);
        socket.emit('JoinUser', { username, roomID, clr });
    }

    const getColor = () => {
        socket.emit('GetClr', { roomID });
    }

    useEffect(() => {
        if (roomid) {
            setRoomID(roomid);
            setDisableBtn(true);
            setTxt("You Are Invited By Your Friend, The RoomId is Automaticaly Filled.");
        }
    }, []);

    useEffect(() => {
        if (!socket || !connected) return;
        sessionStorage.setItem('roomid', roomID);
        setCheckingRoomId(true);
        setColors(['red', 'blue', 'yellow', 'green']);
        getColor();
    }, [roomID])

    useEffect(() => {
        sessionStorage.setItem('username', username);
    }, [username])

    useEffect(() => {
        if (!socket || !connected) return;
        if (roomid) {
            sessionStorage.setItem('roomid', roomID);
            setRoomID(roomid);
            setDisableBtn(true);
            socket.emit('GetClr', { roomID });
        }

        socket.on('GoToHome', () => {
            if (roomid) {
                toast.error(`The Invite Link Is Invalid :(`);
                toast.error('Redirecting To Home Page');
                navigate("/");
            } else {
                setCheckingRoomId(false);
            }
        });

        socket.on('RoomNotAvailabel', () => {
            toast.error('Such Room Is Not Avialabel :(');
        });

        socket.on('NamePresent', () => {
            toast.error('Your Username is Already Takenes, Change It!');
        });

        socket.on('TakeClr', (dt) => {
            setCheckingRoomId(false);
            setClr(dt[0]);
            setColors(dt);
        });

        socket.on('Joined', (dt) => {
            sessionStorage.setItem('maxplayer', dt.maxplayer);
            if (dt.isMatchStarted) {
                navigate('/main-game');
            } else {
                toast.success('you are going to waiting area');
                navigate('/waiting-area');
            }
        });

        return () => {
            socket.off('GoToHome');
            socket.off('RoomNotAvailabel');
            socket.off('NamePresent');
            socket.off('TakeClr');
            socket.off('Joined');
        }

    }, [socket, connected]);

    return (
        <div className="join-container">
            <div className="wrapper">
                <div className="main-heading">Join The Room</div>
                <div className="middle">
                    <div className="left">
                        <div className="info">
                            Enter a Name ,room code , and select Your fav color to join your friends and dive straight into the action. Grab your spot on the board, roll the dice, and let the fun begin—no setup required!
                        </div>
                    </div>
                    <form className="right" onSubmit={handleSubmit}>
                        <div className="fields">
                            <label>Your Name</label>
                            <input
                                type="text"
                                placeholder='Enter Your Name'
                                value={username}
                                onInput={e => setUsername(e.target.value)}
                                maxLength={8}
                                required
                            />
                        </div>
                        <div className="fields">
                            <label>Choose Your Fav Color</label>
                            <div className="player-color">
                                {colors.map((c, i) => {
                                    return (
                                        <div key={i} onClick={() => { setClr(c) }} className={`${c} ${clr === c ? 'clr-select' : ''}`}></div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="fields">
                            <label>Room ID</label>
                            <input
                                type="text"
                                placeholder='Enter Your Roomid'
                                value={roomID}
                                onInput={(e) => { setRoomID(e.target.value) }}
                                disabled={disableBtn}
                                maxLength={6}
                                required
                            />
                            <h4>{txt}</h4>
                        </div>
                        <div className="fields btns">
                            <button type='submit' >Join Room</button>
                            <button type='button' onClick={() => { navigate("/") }}>Home</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Join_Room
