import { useState, useEffect } from 'react'; // Ensure useState (and useEffect if needed) is imported
import { useSession } from "next-auth/react";

const ProtectedDataPage = () => {
    const { data: session, status } = useSession();
    const [message, setMessage] = useState(''); // Change to store a simple message
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session && status !== "loading") {
            const fetchData = async () => {
                const response = await fetch("http://localhost:8080/api/v1/demo-controller", {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                });

                if (!response.ok) {
                    console.error("Failed to fetch data");
                    setLoading(false);
                    return;
                }

                const data = await response.text(); // Use .text() instead of .json() for a plain text response
                setMessage(data); // Store the plain text message
                setLoading(false);
            };

            fetchData().catch(console.error);
        } else if (status === "unauthenticated") {
            setLoading(false);
        }
    }, [session, status]);

    if (loading) return <p>Loading...</p>;
    if (!session) return <p>You must be logged in to view this page</p>;

    // Display the message directly
    return (
        <div>
            <h1>Protected Data</h1>
            {message ? (
                <p>{message}</p> // Display the message
            ) : (
                <p>No data found</p>
            )}
        </div>
    );
};

export default ProtectedDataPage;
