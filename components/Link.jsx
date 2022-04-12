import Link from 'next/link';

export default function MyLink(props) {
	let { href, children, ...rest } = props;
	return (
		<>
			<Link href={href}>
				<a {...rest}>{children}</a>
			</Link>
		</>
	);
}
