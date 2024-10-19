import type { ModalProps } from "@/types/modalTypes";
import React, { memo } from "react";

const Modal = memo(({ title, children, headingChild, onClose, isOpen = false }: ModalProps) => {
	return isOpen ? (
		<div className="modal-container">
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div className={`modal-overlay ${isOpen && "open"}`} style={{ zIndex: 20 }} onClick={onClose} />
			<dialog open={isOpen} className={`modal-section ${isOpen && "open"}`} aria-label={title} aria-modal="true">
				<div className="main-embedWidgetGenerator-container">
					<div className="main-trackCreditsModal-header">
						<h1 className="encore-text encore-title-body-medium">{title}</h1>
						{headingChild && <div>{headingChild}</div>}

						<button
							type="button"
							aria-label="Close"
							className="main-trackCreditsModal-closeBtn"
							onClick={() => onClose()}>
							<svg width="18" height="18" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
								<title>Close</title>
								<path
									d="M31.098 29.794L16.955 15.65 31.097 1.51 29.683.093 15.54 14.237 1.4.094-.016 1.508 14.126 15.65-.016 29.795l1.414 1.414L15.54 17.065l14.144 14.143"
									fill="currentColor"
									fill-rule="evenodd"
								/>
							</svg>
						</button>
					</div>
					<div className="modal-contents">
						<main className="modal-wrapper">{children}</main>
					</div>
				</div>
			</dialog>
		</div>
	) : null;
});

export default Modal;
