import type { LucideIcon } from 'lucide-react';
import type { Link as ReactRouterLink } from 'react-router';
import type { Link as ReactRouterDomLink } from 'react-router-dom';
import type { HTMLComponentProps } from '../../react/types';

type AllowedElements = 'a' | 'button' | typeof ReactRouterLink | typeof ReactRouterDomLink;

export type ButtonVariant =
	| 'default'
	| 'primary'
	| 'secondary'
	| 'outline'
	| 'danger'
	| 'invisible'
	| 'link';

export type ButtonIcon = LucideIcon | Record<'right' | 'left', LucideIcon>;

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ButtonProps<T extends AllowedElements = 'button'> = HTMLComponentProps<T> & {
	variant?: ButtonVariant;
	size?: ButtonSize;
	square?: boolean;
	icon?: ButtonIcon;
};

export function Button<T extends AllowedElements = 'button'>({
	as,
	children,
	className,
	variant = 'default',
	size = 'md',
	square,
	icon,
	...props
}: ButtonProps<T>) {
	const Component = as ?? 'button';

	const classList = ['s-button'];
	if (className) classList.push(className);

	switch (variant) {
		case 'default':
		case 'primary':
		case 'secondary':
		case 'outline':
		case 'danger':
		case 'invisible':
		case 'link':
			classList.push(`-${variant}`);
			break;
		default:
			throw new TypeError(`Invalid button variant '${variant}'`);
	}

	switch (size) {
		case 'sm':
		case 'md':
		case 'lg':
		case 'xl':
		case '2xl':
			classList.push(`-${size}`);
			break;
		default:
			throw new TypeError(`Invalid button size '${size}'`);
	}

	if (square) classList.push('-square');

	const IconLeft = icon && 'left' in icon ? icon.left : icon;
	const IconRight = icon && 'right' in icon ? icon.right : undefined;

	// Since T is a generic type, props cannot be directly passed to Component without casting
	return (
		<Component className={classList.join(' ')} {...(props as any)}>
			{IconLeft && <IconLeft size="1em" />}
			{children}
			{IconRight && <IconRight size="1em" />}
		</Component>
	);
}
