import Dismiss from "@/components/svg/Dismiss";
import Button from "@/components/ui/Button";
import type { ToastType } from "@/types/toast";
import React, { useState, type FC, useCallback, type ReactNode } from "react";

let toastId = 0;

const ToastService = (() => {
	let addToast: (message: ReactNode, isError?: boolean) => void;

	const ToastContainer: FC = () => {
		const [toasts, setToasts] = useState<ToastType[]>([]);

		const addToastInternal = useCallback((message: ReactNode, isError = false) => {
			const id = toastId++;
			setToasts((prev) => [...prev, { id, message, isError, exiting: false }]);

			const timeoutId = setTimeout(() => {
				handleCloseElement(id);
			}, 3000);

			return () => clearTimeout(timeoutId);
		}, []);

		addToast = addToastInternal;

		const handleCloseElement = (id: number) => {
			setToasts((prev) => {
				return prev.map((toast) => (toast.id === id ? { ...toast, exiting: true } : toast));
			});

			setTimeout(() => {
				setToasts((prev) => prev.filter((t) => t.id !== id));
			}, 500);
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
		addToast: (message: ReactNode, isError?: boolean) => addToast(message, isError),
	};
})();

export const { ToastContainer, addToast } = ToastService;
