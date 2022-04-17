import axios from 'axios';
import Swal from 'sweetalert2';

const fetchUser = async ({ setUsername }) => {
	await axios
		.get('https://haudhi.site/users', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		})
		.then((res) => {
			setUsername(res.data.data.name);
		})
		.catch((err) => {
			console.log(err);
		});
};

const participate = ({ event_id, eventId, router }) => {
	axios
		.post(
			`https://haudhi.site/event/participations`,
			{ event_id: eventId },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			}
		)
		.then((res) => {
			console.log(res);
			if (res.data.status === 'success') {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: res.data.message,
					showConfirmButton: false,
					timer: 1500,
				});
			}
			router.reload();
		})
		.catch((err) => {
			console.log(err);
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: err.response.data.message,
				// title: 'You must be logged in to participate',
				showConfirmButton: true,
			}).then(() => {
				router.push('/login');
			});
		});
};

const editButton = ({
	router,
	eventName,
	eventDate,
	eventLocation,
	eventDescription,
	quota,
}) => {
	// e.preventDefault();
	const formData = new FormData();
	formData.append('name', eventName);
	formData.append('date', eventDate);
	formData.append('location', eventLocation);
	formData.append('details', eventDescription);
	formData.append('quota', quota);
	const { eventID } = router.query;
	axios
		.put(`https://haudhi.site/event/${eventID}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		})
		.then((res) => {
			console.log(res);
			if (res.data.status === 'success') {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: res.data.message,
					showConfirmButton: false,
					timer: 1500,
				});
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

export { fetchUser, participate, editButton };
