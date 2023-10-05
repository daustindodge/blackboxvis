import {Bar} from "./Views.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSoap} from "@fortawesome/free-solid-svg-icons";
import {Sorting} from "../components/Components.js";
import {useSortingContext} from "../contexts/SortingContextProvider.jsx";

const Bubble = () =>
{
    const {size, speed, bars} = useSortingContext();

    async function* sort(array)
    {
        let swapped = false;
        for (let i = 0; i < array.length; i++)
        {
            for (let j = 0; j < array.length - i - 1; j++)
            {
                array[j].color = array[j + 1].color = "#615475";

                if (array[j].height > array[j + 1].height)
                {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;

                    swapped = true;
                }

                await new Promise((resolve) => setTimeout(resolve, speed));
                yield array;

                array[j].color = array[j + 1].color = "#a6a6a6";
            }

            if (swapped === false)
            {
                break;
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
                                    <FontAwesomeIcon icon={faSoap} style={{marginRight: "5px"}} />
                                    <strong>Bubble Sort</strong>
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

export default Bubble;