import { useState, useCallback, useRef, useEffect } from "react";

type UseFetchOptions = {
	method?: "GET" | "POST" | "PUT" | "DELETE";
	headers?: HeadersInit;
	immediate?: boolean;
};

export function useFetch<T = unknown>(
	url: string,
	payload?: unknown,
	options: UseFetchOptions = {}
) {
	const { method = "GET", headers, immediate = true } = options;

	const abortControllerRef = useRef<AbortController | null>(null);

	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const execute = useCallback(async () => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}

		const controller = new AbortController();
		abortControllerRef.current = controller;

		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
					...headers,
				},
				body: method !== "GET" ? JSON.stringify(payload) : undefined,
				signal: controller.signal,
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			const result = await response.json();
			setData(result);
		} catch (error: unknown) {
			if (error instanceof Error && error.name === "AbortError") return;
			setError(error instanceof Error ? error.message : "Unknown error");
		} finally {
			setIsLoading(false);
		}
	}, [url, payload, method, headers]);

	const abort = useCallback(() => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
	}, []);

	useEffect(() => {
		if (immediate) execute();
	}, [execute, immediate]);

	useEffect(() => {
		return () => abort();
	}, []);

	return { data, isLoading, error, execute, abort };
}
