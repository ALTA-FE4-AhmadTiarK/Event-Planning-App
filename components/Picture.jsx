import Image from 'next/image';

const UserAttend = ({ username, wide }) => {
	const userProfile = {
		1: '/blue.png',
		2: '/green.png',
		3: '/orange.png',
		4: '/pink.png',
		5: '/cyan.png',
		6: '/red.png',
		7: '/yellow.png',
		8: '/green-old.png',
		9: '/die.png',
		10: '/white.png',
	};
	const random = Math.floor(Math.random() * 10);
	return (
		<>
			<Image
				src={
					userProfile[random]
						? userProfile[random]
						: '/user-circle.svg'
				}
				alt='User thumbnail'
				className='rounded-circle'
				width={wide}
				height={wide}
			/>
			<h6 className='text-center'>User {username}</h6>
		</>
	);
};

export { UserAttend };
