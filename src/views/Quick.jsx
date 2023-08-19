import {Link, Navigate, useOutletContext} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfinity, faPersonRunning, faRotateLeft} from "@fortawesome/free-solid-svg-icons";
import {Bar} from "./Views.js";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {update} from "../slices/ArraySortSlice.js";

const Quick = () =>
{
    const [handleReset, handleSpeed, handleSizeChange, widthRef, sizeRef, speed, SPEED] = useOutletContext();
    const bars = useSelector((state) => state.sortArray.value);
    const dispatch = useDispatch();
    const [_sorting, setSorting] = useState(false);

    const partition = (arr, low, high) =>
    {
        let pivot = arr[high];

        // Index of smaller element and indicates
        // the right position of pivot found so far
        let i = (low - 1);

        for (let j = low; j <= high - 1; j++)
        {

            // If current element is smaller than the pivot
            if (arr[j] < pivot)
            {

                // Increment index of smaller element
                i++;
                let temp = this.array[i];
                this.array[i] = this.array[j];
                this.array[j] = temp;
            }
        }

        let temp = this.array[i + 1];
        this.array[i + 1] = this.array[high];
        this.array[high] = temp;

        return (i + 1);
    }

    const quickSort = (arr, low, high) =>
    {
        if (low < high)
        {
            let part = partition(arr, low, high);

            quickSort(arr, low, part - 1);
            quickSort(arr, part + 1, high);
        }
    }

    const sort = {
        array: [...bars],
        async *[Symbol.asyncIterator]()
        {
            quickSort(this.array, 0, this.array.length);

            // make a pause between values, wait for something
            await new Promise(resolve => setTimeout(resolve, parseInt(speed)));
            yield this.array;


            // for(let i = 0; i < this.array.length; i++)
            // {
            //     let k = this.array[i];
            //     let j = i - 1;
            //     while (j >= 0 && parseInt(JSON.parse(JSON.stringify(this.array[j]))['height']) > parseInt(JSON.parse(JSON.stringify(k))['height']))
            //     {
            //         this.array[j + 1] = this.array[j];
            //         j = j - 1;
            //
            //         // make a pause between values, wait for something
            //         await new Promise(resolve => setTimeout(resolve, parseInt(speed)));
            //         yield this.array;
            //     }
            //
            //     this.array[j + 1] = k;
            // }
        }
    };

    const handleSort = () =>
    {
        setSorting(true);
        // dispatch(sorting(true));

        (async () =>
        {
            for await (let step of sort)
            {
                dispatch(update([...step]));
            }
            setSorting(false);
        })();
    }

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
                            {_sorting ? (
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item disabled" to="/sorting/bubble">Bubble</Link></li>
                                    <li><Link className="dropdown-item disabled" to="/sorting/selection">Selection</Link></li>
                                    <li><Link className="dropdown-item disabled" to="/sorting/insertion">Insertion</Link></li>
                                </ul>
                            ) : (
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/sorting/bubble">Bubble</Link></li>
                                    <li><Link className="dropdown-item" to="/sorting/selection">Selection</Link></li>
                                    <li><Link className="dropdown-item" to="/sorting/insertion">Insertion</Link></li>
                                </ul>
                            )}
                        </div>
                        <div className="vr"></div>
                        {_sorting ? (
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input checked={speed === SPEED.slow} onChange={handleSpeed} value={SPEED.slow} type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" disabled />
                                <label className="btn btn-outline-secondary" htmlFor="btnradio1">Slow</label>
                                <input checked={speed === SPEED.medium} onChange={handleSpeed} value={SPEED.medium} type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" disabled />
                                <label className="btn btn-outline-secondary" htmlFor="btnradio2">Medium</label>
                                <input checked={speed === SPEED.fast} onChange={handleSpeed} value={SPEED.fast} type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" disabled />
                                <label className="btn btn-outline-secondary" htmlFor="btnradio3">Fast</label>
                            </div>
                        ) : (
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input checked={speed === SPEED.slow} onChange={handleSpeed} value={SPEED.slow} type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" />
                                <label className="btn btn-outline-secondary" htmlFor="btnradio1">Slow</label>
                                <input checked={speed === SPEED.medium} onChange={handleSpeed} value={SPEED.medium} type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                                <label className="btn btn-outline-secondary" htmlFor="btnradio2">Medium</label>
                                <input checked={speed === SPEED.fast} onChange={handleSpeed} value={SPEED.fast} type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" />
                                <label className="btn btn-outline-secondary" htmlFor="btnradio3">Fast</label>
                            </div>
                        )}
                    </div>
                </div>
                <div style={{width: "300px"}}>
                    <label htmlFor="customRange2" className="form-label">Array Size</label>
                    {_sorting ? (
                        <input ref={sizeRef} onChange={handleSizeChange} type="range" className="form-range" min="10" max="150" step="5" defaultValue="75" id="customRange2" disabled />
                    ) : (
                        <input ref={sizeRef} onChange={handleSizeChange} type="range" className="form-range" min="10" max="150" step="5" defaultValue="75" id="customRange2" />
                    )}
                </div>
                <div>
                    <div className="hstack gap-3">
                        {_sorting ? (
                            <button onClick={handleReset} type="button" className="btn btn-secondary disabled">
                                <FontAwesomeIcon icon={faRotateLeft} style={{marginRight: "5px"}} />
                                Reset
                            </button>
                        ) : (
                            <button onClick={handleReset} type="button" className="btn btn-secondary">
                                <FontAwesomeIcon icon={faRotateLeft} style={{marginRight: "5px"}} />
                                Reset
                            </button>
                        )}
                        <div className="vr"></div>
                        <button onClick={handleSort} type="button" className="btn btn-secondary">
                            <FontAwesomeIcon icon={faPersonRunning} style={{marginRight: "5px"}} />
                            Sort
                        </button>
                    </div>
                </div>
            </div>
            <div ref={widthRef} className="card shadow" style={{minHeight: `80vh`}}>
                <div className="card-header">
                    <div className="hstack">
                        <div>Insertion Sort</div>
                        <div className="ms-auto">{bars.length} elements</div>
                    </div>
                </div>
                <div className="card-body d-flex justify-content-center" style={{height: '100%'}}>
                    {bars.map((bar, index) => <Bar key={index} height={`${bar.height}vh`} width={`${bar.width}px`} />)}
                </div>
            </div>
        </>
    )
}

export default Quick;