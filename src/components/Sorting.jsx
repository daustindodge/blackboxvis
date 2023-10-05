import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHand, faInfinity, faPersonRunning, faPlay, faRotateLeft} from "@fortawesome/free-solid-svg-icons";
import {useCallback, useEffect, useLayoutEffect, useRef} from "react";
import {randomize, SPEED, STATE} from "../lib/utils.js";
import {useSortingContext} from "../contexts/SortingContextProvider.jsx";
import {Toast} from "bootstrap";
import {SortingToast} from "./Components.js";
import useSorter from "../hooks/useSorter.js";

const Sorting = ({children, sort}) =>
{
    const sizeRef = useRef();
    const widthRef = useRef();
    const {width, setWidth, size, setSize, speed, setSpeed, running, setRunning, bars, setBars} = useSortingContext();
    const toastError = useRef();
    const toastFinished = useRef();
    const error = new Toast(toastError.current);
    const finished = new Toast(toastFinished.current);
    const controller = useSorter();

    const steps = async () =>
    {
        let steps = sort([...bars]);

        for await (const step of steps)
        {
            if (controller.cancelled)
            {
                throw new Error();
            }

            await controller.promise;

            setBars([...step]);
        }
    }

    const handleSort = useCallback(() =>
    {
        if (running === STATE.idle)
        {
            setRunning(STATE.running);

            steps()
                .then(() =>
                {
                    finished.show();
                    setTimeout(() => {setBars(randomize(width, size))}, 5000);
                    setRunning(STATE.idle);
                })
                .catch(() =>
                {
                    error.show();
                    setBars(randomize(width, size));
                    controller.reset();
                    setRunning(STATE.idle);
                });
        }
        else if (running === STATE.running || running === STATE.unpaused)
        {
            controller.pause();
            setRunning(STATE.paused);
        }
        else if (running === STATE.paused)
        {
            controller.unpause();
            setRunning(STATE.unpaused);
        }
    }, [finished, error, running, controller]);

    const handleReset = () =>
    {
        controller.cancel();
        handleSort();
    }

    useEffect(() =>
    {
        setBars(randomize(width, size));
    }, [width, size]);

    const handleSpeed = event =>
    {
        setSpeed(event.target.value);
    }

    const handleSizeChange = () =>
    {
        setSize(sizeRef.current.value);
    }

    useLayoutEffect(() =>
    {
        setWidth(widthRef.current.offsetWidth);
    }, [widthRef]);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <div className="hstack gap-3">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faInfinity} style={{marginRight: "5px"}} />
                                Algorithm
                            </button>
                            <ul className="dropdown-menu">
                                <li><NavLink to="/sorting/bubble" className="dropdown-item" disabled={running !== STATE.idle}>Bubble</NavLink></li>
                                <li><NavLink to="/sorting/selection" className="dropdown-item" disabled={running !== STATE.idle}>Selection</NavLink></li>
                                <li><NavLink to="/sorting/insertion" className="dropdown-item" disabled={running !== STATE.idle}>Insertion</NavLink></li>
                                <li><NavLink to="/sorting/quick" className="dropdown-item" disabled={running !== STATE.idle}>Quick</NavLink></li>
                                <li><NavLink to="/sorting/merge" className="dropdown-item" disabled={running !== STATE.idle}>Merge</NavLink></li>
                                <li><NavLink to="/sorting/heap" className="dropdown-item" disabled={running !== STATE.idle}>Heap</NavLink></li>
                            </ul>
                        </div>
                        <div className="vr"></div>
                        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                            <input checked={speed === SPEED.slow} onChange={handleSpeed} value={SPEED.slow} type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" disabled={running !== STATE.idle} />
                            <label className="btn btn-outline-secondary" htmlFor="btnradio1">Slow</label>
                            <input checked={speed === SPEED.medium} onChange={handleSpeed} value={SPEED.medium} type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" disabled={running !== STATE.idle} />
                            <label className="btn btn-outline-secondary" htmlFor="btnradio2">Medium</label>
                            <input checked={speed === SPEED.fast} onChange={handleSpeed} value={SPEED.fast} type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" disabled={running !== STATE.idle} />
                            <label className="btn btn-outline-secondary" htmlFor="btnradio3">Fast</label>
                        </div>
                    </div>
                </div>
                <div style={{width: "300px"}}>
                    <label htmlFor="customRange2" className="form-label">{size} elements</label>
                    <input ref={sizeRef} onChange={handleSizeChange} type="range" className="form-range" min="10" max="150" step="5" defaultValue="75" id="customRange2" disabled={running !== STATE.idle} />
                </div>
                <div>
                    <div className="hstack gap-3">
                        <button onClick={handleReset} type="button" className="btn btn-secondary">
                            <FontAwesomeIcon icon={faRotateLeft} style={{marginRight: "5px"}} />
                            Reset
                        </button>
                        <div className="vr"></div>
                        <button onClick={handleSort} type="button" className="btn btn-primary">
                            {running === STATE.idle ? (
                                <>
                                    <FontAwesomeIcon icon={faPersonRunning} style={{marginRight: "5px"}} />
                                    Sort
                                </>
                            ) : running === STATE.running || running === STATE.unpaused ? (
                                <>
                                    <FontAwesomeIcon icon={faHand} style={{marginRight: "5px"}} />
                                    Stop
                                </>
                            ) : running === STATE.paused ? (
                                <>
                                    <FontAwesomeIcon icon={faPlay} style={{marginRight: "5px"}} />
                                    Play
                                </>
                            ) : (
                                <>
                                    Error
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-100" ref={widthRef}>
                {children}
            </div>
            <SortingToast toastRef={toastError} title="Sorting Cancelled." bg="text-bg-danger" />
            <SortingToast toastRef={toastFinished} title="Sorting Completed!" bg="text-bg-primary" />
        </>
    )
}

export default Sorting;