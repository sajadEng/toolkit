import Header from "../components/Header"
function Homepage() {
    return (
        <div className="main-homepage">
            <Header />
            <main>
                <div className="main-homepage-right-side">
                    <h1>All in One Toolkit</h1>
                    <p>You don't need anything else</p>
                </div>
                <img src="./src/images/land image.png" alt="" />
            </main>
            <div className="main-background"></div>
        </div>
    )
}

export default Homepage
