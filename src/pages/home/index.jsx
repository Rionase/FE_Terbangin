import { useState, useEffect, useRef } from "react";
import FormArea from "../../components/FormArea";
import Banner from "../../components/Banner";
import "bootstrap/dist/css/bootstrap.min.css";
import "tippy.js/dist/tippy.css";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isFullScreen, setIsFullScreen] = useState(window.innerWidth > 1160);
    const [flightDataUser, setFlightDataUser] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setIsFullScreen(window.innerWidth > 1160);
            setIsMobile(window.innerWidth < 768);
        };

        // Set initial value based on the current window size
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const flightData = localStorage.getItem("flightData");
        if (flightData) {
            const parsedData = JSON.parse(flightData);
            setFlightDataUser(parsedData);
        }
    }, []);

    return (
        <>
            {!isMobile && <Banner />}
            {/* search bar */}

            <FormArea
                isFullScreen={isFullScreen}
                isMobile={isMobile}
                title={
                    <>
                        Pilih Jadwal Penerbangan spesial di{" "}
                        <span style={{ color: "#7126B5" }}>TerbangIn!</span>
                    </>
                }
                flightDataUser={flightDataUser}
            />

        </>
    );
};

export default Home;
