import { useState } from "react"
import "../App.css"
import AppBar from "./$widgets/AppBar"
import Body from "./$widgets/Body"

const Home = () => {
    const [rnd, setRnd] = useState(0)

    return (
        <div className="bg-white dark:bg-[#151515]" style={{ height: "100vh" }}>
            <AppBar setRnd={setRnd} />
            <Body key={rnd} />
        </div>
    )
}

export default Home
