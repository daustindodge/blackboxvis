import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBolt} from "@fortawesome/free-solid-svg-icons";
import {Bar} from "./Views.js";
import {Sorting} from "../components/Components.js";
import {useSortingContext} from "../contexts/SortingContextProvider.jsx";

let part = {value: 0};

const Quick = () =>
{
    const {size, speed, bars} = useSortingContext();

    async function* partition(array, low, high)
    {
        let pivot = array[high];
        let i = low - 1;

        for (let j = low; j <= high - 1; j++)
        {
            if (array[j].height < pivot.height)
            {
                i++;

                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;

                yield array;
            }
        }

        let temp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp;

        part.value = i + 1;
    }

    async function* sort(array, low = 0, high = size - 1)
    {
        if (low < high)
        {
            let swaps = partition(array, low, high);
            for await (const swap of swaps)
            {
                await new Promise((resolve) => setTimeout(resolve, speed));
                yield swap;
            }

            let lows = sort(array, low, part.value - 1);
            for await (const low of lows)
            {
                yield low;
            }

            let highs = sort(array, part.value + 1, high);
            for await (const high of highs)
            {
                yield high;
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
                                    <FontAwesomeIcon icon={faBolt} style={{marginRight: "5px"}} />
                                    <strong>Quick Sort</strong>
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

export default Quick;