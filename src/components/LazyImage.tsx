import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

type Props = {
	src: string;
	alt: string;
	className?: string;
};

export function LazyImage({ src, alt, className }: Props) {
	const { t } = useTranslation();
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [isInView, setIsInView] = useState(false);
	
	const imgRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);

		if (imgRef.current) {
			observer.observe(imgRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<div ref={imgRef} className={`relative ${className}`}>
			{!isLoaded && !hasError && (
				<div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
			)}
			{isInView && (
				<img
					src={src}
					alt={alt}
					className={`${className} transition-opacity duration-300 object-center ${
						isLoaded ? 'opacity-100' : 'opacity-0'
					}`}
					onLoad={() => setIsLoaded(true)}
					onError={() => setHasError(true)}
				/>
			)}
			{hasError && (
				<div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded">
					<span className="text-gray-400 text-sm">{t("common.noImage")}</span>
				</div>
			)}
		</div>
	);
}