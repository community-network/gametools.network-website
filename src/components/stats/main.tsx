import {
    BrowserRouter as Router,
    Route,
    Link,
    RouteComponentProps
  } from "react-router-dom";
type TParams = { plat: string, eaid: string, game: string }

function Stats({ match }: RouteComponentProps<TParams>) {
    return (
    <div>
        {match.params.plat}
        {match.params.eaid}
        {match.params.game}
    </div>
    )
}

export default Stats;