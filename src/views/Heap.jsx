import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCubesStacked} from "@fortawesome/free-solid-svg-icons";
import {Bar} from "./Views.js";
import {Sorting} from "../components/Components.js";
import {useSortingContext} from "../contexts/SortingContextProvider.jsx";

const Heap = () =>
{
    const {size, speed, bars} = useSortingContext();

    async function* heap(array, size, i)
    {
        let max = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < size && array[left].height > array[max].height)
        {
            max = left;
        }

        if (right < size && array[right].height > array[max].height)
        {
            max = right;
        }

        if (max !== i)
        {
            let temp = array[i];
            array[i] = array[max];
            array[max] = temp;

            let swaps = heap(array, size, max);
            for await (const swap of swaps)
            {
                await new Promise((resolve) => setTimeout(resolve, speed));
                yield swap;
            }
        }

        yield array;
    }

    async function* sort(array)
    {
        let size = array.length;

        for (let i = Math.floor(size / 2) - 1; i >= 0; i--)
        {
            let swaps = heap(array, size, i);
            for await (const swap of swaps)
            {
                await new Promise((resolve) => setTimeout(resolve, speed));
                yield swap;
            }
        }

        for (let i = size - 1; i > 0; i--)
        {
            let temp = array[0];
            array[0] = array[i];
            array[i] = temp;

            let swaps = heap(array, i, 0);
            for await (const swap of swaps)
            {
                await new Promise((resolve) => setTimeout(resolve, speed));
                yield swap;
            }
        }
    }

    return (
        <>
            <Sorting sort={sort}>
                <div className="tab-pane fade show active" id="bubble" role="tabpanel" aria-labelledby="bubble" tabIndex="0">
                    <div className="card shadow-sm" style={{minHeight: `80vh`}}>
                        <div className="card-header bg-light">
                            <div className="hstack">
                                <div>
                                    <FontAwesomeIcon icon={faCubesStacked} style={{marginRight: "5px"}} />
                                    <strong>Heap Sort</strong>
                                </div>
                                <div className="ms-auto">{size} elements</div>
                            </div>
                        </div>
                        <div className="card-body d-flex justify-content-center pb-0" style={{height: '100%'}}>
                            {bars.map((bar, index) => <Bar key={index} height={`${bar.height}vh`} width={`${bar.width}px`} color={bar.color} />)}
                        </div>
                    </div>
                </div>
            </Sorting>
        </>
    )
}

export default Heap;