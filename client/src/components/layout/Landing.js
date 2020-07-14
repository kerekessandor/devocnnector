import React from "react";
import Navbar from "./Navbar";

const Landing = () => {
	return (
		<div className='cover-container d-flex w-100 p-3 mx-auto flex-column'>
			<Navbar />
			<main role='main' className='inner cover mb-auto mt-auto motto'>
				<div className='container'>
					<h1 className='text-white headerTitle'>
						Life would be much easier, <br /> if we would have the source code
					</h1>
					<p className='kaltech-gradient'>
						Kaltechs is a great solution for your idea, without the source code.
					</p>
				</div>
			</main>
		</div>
	);
};

export default Landing;
