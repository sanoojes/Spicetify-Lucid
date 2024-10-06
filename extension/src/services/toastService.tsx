import Dismiss from "@/components/svg/Dismiss";
import Button from "@/components/ui/Button";
import type { ToastType } from "@/types/toast";
import React, { useState, type FC } from "react";

const ToastService = (() => {
	let addToast: (message: string, isError?: boolean) => void;

	const ToastContainer: FC = () => {
		const [toasts, setToasts] = useState<ToastType[]>([]);

		addToast = (message, isError = false, exiting = false) => {
			const id = new Date().getTime();
			setToasts((prev) => [...prev, { id, message, isError, exiting }]);

			const timeoutId = setTimeout(() => {
				handleCloseElement(id);
			}, 3000);

			return () => clearTimeout(timeoutId);
		};

		const handleCloseElement = (id: number) => {
			setToasts((prev) => {
				const toastToClose = prev.find((t) => t.id === id);
				if (toastToClose) {
					return prev.map((toast) => (toast.id === id ? { ...toast, exiting: true } : toast));
				}
				return prev;
			});

			setTimeout(() => {
				setToasts((prev) => prev.filter((t) => t.id !== id));
			}, 300);
		};

		return (
			<div className="toast-container">
				{toasts.map((toast) => (
					<div
						key={toast.id}
						className={`toast-element ${toast.exiting ? "toast-exit" : ""}`}
						style={{
							backgroundColor: `${toast.isError ? "rgba(200,20,20,0.5)" : "rgba(20,20,20,0.5)"}`,
						}}>
						{toast.message}
						<Button icon={<Dismiss />} onClick={() => handleCloseElement(toast.id)} />
					</div>
				))}
			</div>
		);
	};

	return {
		ToastContainer,
		addToast: (message: string, isError?: boolean) => addToast(message, isError),
	};
})();

export const { ToastContainer, addToast } = ToastService;
