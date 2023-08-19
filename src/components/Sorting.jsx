import {Link, Outlet} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfinity, faPersonRunning, faRotateLeft} from "@fortawesome/free-solid-svg-icons";
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {create, size, sorting, update, width} from "../slices/ArraySortSlice.js";

const Sorting = () =>
{
    const SPEED = {
        slow: '10',
        medium: '5',
        fast: '1'
    }
    const sizeRef = useRef();
    const widthRef = useRef();
    const [speed, setSpeed] = useState(SPEED.slow);
    // const [size, setSize] = useState('75');
    // const [width, setWidth] = useState('0');
    const [_sorting, setSorting] = useState(false);
    const dispatch = useDispatch();

    const handleSpeed = event =>
    {
        setSpeed(event.target.value);
    }

    const handleSizeChange = () =>
    {
        dispatch(size(sizeRef.current.value));
        dispatch(create());
    }

    const handleReset = () =>
    {
        sizeRef.current.value = '75';
        dispatch(size('75'));
        dispatch(create());
    }

    useLayoutEffect(() =>
    {
        dispatch(width(widthRef.current.offsetWidth));
    }, [dispatch]);

    useEffect(() =>
    {
        dispatch(width(widthRef.current.offsetWidth));
        dispatch(create());
    }, [dispatch]);

    return (
        <div className="container">
            <Outlet context={[handleReset, handleSpeed, handleSizeChange, widthRef, sizeRef, speed, SPEED]} />
        </div>
    )
}

export default Sorting;