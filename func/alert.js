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

function pass8char() {
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: 'Password must be at least 8 characters',
	});
}

function matchPassword() {
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: 'Password does not match',
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

function successConfirm({ res, router }) {
	Swal.fire({
		title: 'Success',
		text: res.data.message,
		icon: 'success',
		confirmButtonText: 'Ok',
	}).then((result) => {
		if (result.value) {
			router.push('/');
		}
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

function deleteAccount(res) {
	Swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes',
	}).then((result) => {
		if (result.value) {
			successMessage(res);
		}
	});
}

function profileUpdated() {
	Swal.fire({
		title: 'Profile updated successfully',
		icon: 'success',
		showConfirmButton: false,
		timer: 1500,
	});
}

function logout(router) {
	Swal.fire({
		title: 'Are you sure?',
		text: 'You want to log out?',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes',
	}).then((result) => {
		if (result.value) {
			localStorage.removeItem('token');
			router.push('/');
		}
	});
}

export {
	pleaseLogin,
	emptyComment,
	successMessage,
	successConfirm,
	errorMessage,
	loginAlert,
	quotaFull,
	fillAll,
	pass8char,
	matchPassword,
	notHost,
	deleteAccount,
	profileUpdated,
	logout,
};
