import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {Bar} from "./Views.js";
import {Sorting} from "../components/Components.js";
import {useSortingContext} from "../contexts/SortingContextProvider.jsx";

const Insertion = () =>
{
    const {size, speed, bars} = useSortingContext();

    async function* sort(array)
    {
        let i, j;
        for(i = 0; i < array.length; i++)
        {
            let key = {...array[i]};
            j = i - 1;

            while (j >= 0 && array[j].height > key.height)
            {
                array[j].color = array[j+1].color = "#615475";

                let temp = {...array[j + 1]};
                array[j + 1] = {...array[j]};
                array[j] = temp;

                await new Promise((resolve) => setTimeout(resolve, speed));
                yield array;

                array[j].color = array[j+1].color = "#a6a6a6";

                j = j - 1;
            }

            array[j + 1] = key;
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
                                    <FontAwesomeIcon icon={faRightToBracket} style={{marginRight: "5px"}} />
                                    <strong>Insertion Sort</strong>
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

export default Insertion;