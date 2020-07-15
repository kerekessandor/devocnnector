import React from "react";
import spinner from "../../assets/svg/preloaders/circle-preloader.svg";

const Spinner = () => {
	return (
		<React.Fragment>
			<img
				src={spinner}
				className='spinner_full'
				alt='Loading...'
			/>
		</React.Fragment>
	);
};

export default Spinner;
