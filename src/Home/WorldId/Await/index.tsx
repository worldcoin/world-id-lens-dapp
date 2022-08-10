import { memo, useEffect } from "react";

// FIXME: implement worldId Widget
export const Await = memo(function Await(props: {
    onConnect: () => void
}) {
	useEffect(() => {		
		let timer: NodeJS.Timeout

		timer = setTimeout(props.onConnect, 2000)

		return () => {
			clearTimeout(timer)
		}
	}, [props])

    return <div className="grid gap-y-8 text-center">
        <div className="bg-ffffff p-4 rounded-xl">
            <p className="text-24">World Id Connect Simulation</p>
            <p>Wait 2 seconds before continue</p>
        </div>
        <div className="bg-ffffff p-4 rounded-xl">

        </div>
    </div>
})