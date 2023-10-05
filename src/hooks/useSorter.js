import {useMemo} from "react";

const useSorter = () =>
{
    return useMemo(() =>
        (
            {
                cancelled: false,
                promise: null,
                pause()
                {
                    this.unpause();
                    this.promise = new Promise((resolve) => this.unpause = resolve);
                },
                unpause() {},
                cancel()
                {
                    this.cancelled = true;
                },
                reset()
                {
                    this.cancelled = false;
                    this.promise = null;
                }
            }
        ), []);
}

export default useSorter;