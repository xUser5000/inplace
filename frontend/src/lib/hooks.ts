import { useAuth } from '@/components/providers/auth-provider';
import { useState, useEffect } from 'react';

interface FetchHookOptions {
    method: string;
    headers?: { [key: string]: string };
    body?: BodyInit | null;
}

function useAuthenticatedFetch(url: string, options: FetchHookOptions): [any, boolean, Error | null] {
    const { token } = useAuth();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, {
                    method: options.method,
                    headers: {
                        ...(options.headers || {}),
                        'Authorization': token ? `Bearer ${token}` : '', // Attach token to Authorization header
                    },
                    body: options.body,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                setData(responseData);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        }

    }, [url, token, options.method, options.headers, options.body]);

    return [data, loading, error];
}

export default useAuthenticatedFetch;
