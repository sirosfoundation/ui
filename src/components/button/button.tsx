import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonProps = {
	children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: ButtonProps) {
	return (
		<button className="s-button" {...props}>
			{children}
		</button>
	);
}
