import type { ComponentProps, ElementType, PropsWithChildren } from 'react';

/**
 * Base properties for UI components.
 */
export type HTMLComponentProps<T extends ElementType> = PropsWithChildren<{
	/**
	 * The HTML element or React component to render as.
	 */
	as?: T;
}> &
	Omit<ComponentProps<T>, 'as' | 'children'>;
