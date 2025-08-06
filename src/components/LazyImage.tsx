import { useState } from "react";

type LazyImageProps = {
	src: string;
	alt: string;
	className?: string;
};

export function LazyImage({ src, alt, className }: LazyImageProps) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);

	return (
		<div className={`relative ${className}`}>
			{!isLoaded && !hasError && (
				<div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
			)}
			<img
				src={src}
				alt={alt}
				loading="lazy"
				className={`${className} transition-opacity duration-300 ${
					isLoaded ? 'opacity-100' : 'opacity-0'
				}`}
				onLoad={() => setIsLoaded(true)}
				onError={() => setHasError(true)}
			/>
			{hasError && (
				<div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded">
					<span className="text-gray-400 text-sm">Нет изображения</span>
				</div>
			)}
		</div>
	);
}