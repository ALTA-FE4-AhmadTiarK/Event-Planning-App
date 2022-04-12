import Head from 'next/head';
import MyLink from '../components/Link';

export default function Login() {
	return (
		<>
			<Head>
				<title>Login Page</title>
				<meta name='login' content='Login Page' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div
				className='overflow-auto position-relative'
				style={{ backgroundColor: '#212840', height: 100 + 'vh' }}>
				<div className='container text-center position-absolute top-50 start-50 translate-middle w-50'>
					<form
						className='border p-5'
						style={{
							backgroundColor: '#F6F7FF',
							borderRadius: 15 + 'px',
						}}>
						<h1 className='text-uppercase pb-4 fw-bold'>Login</h1>
						<div className='form-group my-3'>
							<label className='h5 text-uppercase'>
								Email address
							</label>
							<input
								type='email'
								className='form-control'
								placeholder='Input your email'
							/>
						</div>
						<div className='form-group my-3'>
							<label className='h5 text-uppercase'>
								Password
							</label>
							<input
								type='password'
								className='form-control'
								placeholder='Input your password'
							/>
						</div>
						<button className='btn btn-danger px-5 mt-4 mb-2'>
							Login
						</button>
						<p className='text-muted'>
							Does not have an account?{' '}
							<MyLink href='/register' className='link-danger'>
								Register
							</MyLink>
						</p>
					</form>
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps() {
	return {
		props: {
			data: null,
		},
	};
}
