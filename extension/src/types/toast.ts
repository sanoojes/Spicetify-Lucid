export type ToastType = {
	id: number;
	message: string;
	exiting: boolean;
	isError: boolean;
};
export type ToastContextType = (message: string) => void;
