import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCodeMerge} from "@fortawesome/free-solid-svg-icons";
import {Bar} from "./Views.js";
import {Sorting} from "../components/Components.js";
import {useSortingContext} from "../contexts/SortingContextProvider.jsx";

const Merge = () =>
{
    const {size, speed, bars} = useSortingContext();

    async function* merge(array, left, part, right)
    {
        let size1 = part - left + 1;
        let size2 = right - part;
        let leftTemp = [];
        let rightTemp = [];

        for (let i = 0; i < size1; i++)
        {
            leftTemp[i] = array[left + i];
        }

        for (let j = 0; j < size2; j++)
        {
            rightTemp[j] = array[part + 1 + j];
        }

        let i = 0;
        let j = 0;
        let k = left;

        while (i < size1 && j < size2)
        {
            if (leftTemp[i].height <= rightTemp[j].height)
            {
                array[k] = leftTemp[i];

                i++;
            }
            else
            {
                array[k] = rightTemp[j];

                j++;
            }

            yield array;

            k++;
        }

        while (i < size1)
        {
            array[k] = leftTemp[i];

            yield array;

            i++;
            k++;
        }

        while (j < size2)
        {
            array[k] = rightTemp[j];

            yield array;

            j++;
            k++;
        }
    }

    async function* sort(array, left = 0, right = size - 1)
    {
        if (left >= right)
        {
            return;
        }

        let part = left + parseInt((right - left) / 2);

        let lefts = sort(array, left, part);
        for await (const left of lefts)
        {
            yield left;
        }

        let rights = sort(array, part + 1, right);
        for await (const right of rights)
        {
            yield right;
        }

        let steps = merge(array, left, part, right);
        for await (const step of steps)
        {
            await new Promise((resolve) => setTimeout(resolve, speed));
            yield step;
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
                                    <FontAwesomeIcon icon={faCodeMerge} style={{marginRight: "5px"}} />
                                    <strong>Merge Sort</strong>
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

export default Merge;