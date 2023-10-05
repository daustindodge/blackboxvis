import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faListCheck} from "@fortawesome/free-solid-svg-icons";
import {Bar} from "./Views.js";
import {Sorting} from "../components/Components.js";
import {useSortingContext} from "../contexts/SortingContextProvider.jsx";

const Selection = () =>
{
    const {size, speed, bars} = useSortingContext();

    async function* sort(array)
    {
        for (let i = 0; i < array.length - 1; i++)
        {
            let min = i;
            for (let j = i + 1; j < array.length; j++)
            {
                if (array[j].height < array[min].height)
                {
                    min = j;
                }
            }

            if (min !== i)
            {
                array[min].color = array[i].color = "#615475";

                let temp = array[min];
                array[min] = array[i];
                array[i] = temp;

                await new Promise((resolve) => setTimeout(resolve, speed));
                yield array;

                array[min].color = array[i].color = "#a6a6a6";
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
                                    <FontAwesomeIcon icon={faListCheck} style={{marginRight: "5px"}} />
                                    <strong>Selection Sort</strong>
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

export default Selection;