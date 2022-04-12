import React from 'react';
import Navbar from './Navbar';

const Layout = (props) => {
	return (
		<div className='overflow-auto' style={{ backgroundColor: '#F6F7FF' }}>
			<Navbar />
			<div className='container'>{props.children}</div>
		</div>
	);
};

export default Layout;
