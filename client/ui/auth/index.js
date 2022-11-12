export const AuthLink = ({ link }) => {
	return <a href={link.href}>{link.label}</a>;
};

export const AuthButton = ({ children, ...props }) => {
	return (
		<button
			{...props}
			type='button'
			className='relative inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2'
		>
			children
		</button>
	);
};
