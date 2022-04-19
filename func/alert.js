import Swal from 'sweetalert2';

function pleaseLogin(router) {
	Swal.fire({
		title: 'Please login first',
		icon: 'warning',
		confirmButtonColor: '#3085d6',
		confirmButtonText: 'Login',
	}).then((result) => {
		if (result.value) {
			router.push('/login');
		}
	});
}
function loginAlert() {
	Swal.fire({
		position: 'center',
		icon: 'error',
		title: 'You must be logged in to make a comment',
		showConfirmButton: false,
		timer: 1500,
	});
}

function fillAll() {
	Swal.fire({
		position: 'center',
		icon: 'error',
		title: 'Please fill all the fields',
		showConfirmButton: false,
		timer: 1500,
	});
}

function emptyComment() {
	Swal.fire({
		position: 'center',
		icon: 'error',
		title: 'Comment cannot be empty',
		showConfirmButton: false,
		timer: 1500,
	});
}

function successMessage(res) {
	Swal.fire({
		position: 'center',
		icon: 'success',
		title: res.data.message,
		showConfirmButton: false,
		timer: 1500,
	});
}

function errorMessage(err) {
	Swal.fire({
		position: 'center',
		icon: 'error',
		title: err.response.data.message,
		showConfirmButton: false,
		timer: 1500,
	});
}

function quotaFull() {
	Swal.fire({
		position: 'center',
		icon: 'error',
		title: 'Quota is full',
		showConfirmButton: false,
		timer: 1500,
	});
}

function notHost() {
	Swal.fire({
		position: 'center',
		icon: 'error',
		title: 'You are not the host of this event',
		showConfirmButton: false,
		timer: 1500,
	});
}

export {
	pleaseLogin,
	emptyComment,
	successMessage,
	errorMessage,
	loginAlert,
	quotaFull,
	fillAll,
	notHost,
};
