import React from "react";

const Calendar = () => {
	return (
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g filter="url(#filter0_d_292_333)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M17 5V3C17.8271 3 18.999 2.99756 18.999 2.99756C20.6564 2.99479 22 4.33042 22 5.98604V19.0075C22 20.6602 20.6567 22 19.0058 22H4.9942C3.34055 22 2 20.6471 2 19.0075V5.9921C2 4.3396 3.33905 3 5.00117 3H6.9942L7 5H9.00004C9.00001 4.99688 9 3.00937 9 3.00937C9 2.45191 9.44386 2 10 2C10.5523 2 11 2.44335 11 3.00937V4.99063C11 4.99376 13 5 13 5C13 4.99688 13 3.00937 13 3.00937C13 2.45191 13.4439 2 14 2C14.5523 2 15 2.44335 15 3.00937V4.99063C15 4.99376 19.0002 4.99867 19.0002 4.99867C19.5524 4.9994 20 5.44267 20 5.99896V8H4V5.99896C4 5.44725 4.44372 5 4.99982 5H9.00004C9.00495 5.56153 9.45077 6 10 6C10.553 6 10.995 5.55314 11 5H13C13.0049 5.56153 13.4508 6 14 6C14.553 6 14.995 5.55314 15 5H17ZM20 18.973C20 19.5208 19.5554 19.9649 18.9991 19.9649H5.00087C4.44811 19.9649 4 19.5108 4 18.973V10H20V18.973ZM7 12H9V14H7V12ZM7 16H9V18H7V16ZM11 16H13V18H11V16ZM15 16H17V18H15V16ZM15 12H17V14H15V12ZM11 12H13V14H11V12Z"
					fill="#172B4D"
				/>
			</g>
			<defs>
				<filter
					id="filter0_d_292_333"
					x="-18"
					y="-17"
					width="60"
					height="60"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="1" />
					<feGaussianBlur stdDeviation="10" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_292_333" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_292_333"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
	);
};

export default Calendar;
