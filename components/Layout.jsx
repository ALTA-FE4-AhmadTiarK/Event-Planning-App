import React from 'react';
import Navbar from './Navbar';

const Layout = (props) => {
	return (
		<div className='overflow-auto' style={{ backgroundColor: '#F6F7FF' }}>
			<Navbar onChange={props.onChange} />
			<div className='container'>{props.children}</div>
		</div>
	);
};

export default Layout;
