import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProfile } from "../../redux/actions/auth";
import TopLoadingBar from "react-top-loading-bar";

const NonProtected = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const loadingBarRef = useRef(null);

    useEffect(() => {
        dispatch(getProfile(navigate, "/", null));
    }, [dispatch, navigate]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem("hasLoaded");
            localStorage.removeItem("flightData");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("unload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("unload", handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        const hasLoaded = localStorage.getItem("hasLoaded");
        if (!hasLoaded) {
            loadingBarRef.current.continuousStart();

            const timeout1 = setTimeout(() => {
                loadingBarRef.current.continuousStart();
            }, 1000);

            const timeout2 = setTimeout(() => {
                loadingBarRef.current.continuousStart();
            }, 2000);

            const timeout3 = setTimeout(() => {
                loadingBarRef.current.complete();
                setIsLoading(false);
                localStorage.setItem("hasLoaded", "true");
            }, 3000);

            return () => {
                clearTimeout(timeout1);
                clearTimeout(timeout2);
                clearTimeout(timeout3);
            };
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <>
            <TopLoadingBar color="#7126B5" ref={loadingBarRef} />
            {isLoading ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh",
                    }}
                >
                </div>
            ) : (
                children
            )}
            <style>
                {`
                     @keyframes wave {
                        0%, 100% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-8px);
                        }
                    }
                    h1 span {
                        display: inline-block;
                        animation: wave 1s infinite;
                    }
                `}
            </style>
        </>
    );
};

export default NonProtected;
