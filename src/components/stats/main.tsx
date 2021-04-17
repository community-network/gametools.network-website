import {
    BrowserRouter as Router,
    Route,
    Link,
    RouteComponentProps
  } from "react-router-dom";
type TParams = { id: string }

function Stats({ match }: RouteComponentProps<TParams>) {
    console.log(match)
    return <div>{match.params.id}</div>
}

export default Stats;