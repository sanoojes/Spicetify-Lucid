export const makeElementDraggable = (
	selectors: string,
	npvSettings: { position: { x: number; y: number } },
	setCompactNpvPosition: (position: { x: number; y: number }) => void,
): (() => void) | null => {
	const element = document.querySelector(selectors) as HTMLDivElement | null;

	if (!element) return null;

	let lastMouseX = 0;
	let lastMouseY = 0;

	// Set the initial position of the element
	element.style.position = "fixed";
	element.style.left = `${npvSettings.position.x}px`;
	element.style.top = `${npvSettings.position.y}px`;
	element.style.cursor = "move";

	const handleMouseDown = (e: MouseEvent) => {
		lastMouseX = e.clientX;
		lastMouseY = e.clientY;
		e.preventDefault();

		// Add event listeners for mouse move and mouse up
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	const handleMouseUp = () => {
		// Remove event listeners when the mouse button is released
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	};

	const handleMouseMove = (e: MouseEvent) => {
		const deltaX = e.clientX - lastMouseX;
		const deltaY = e.clientY - lastMouseY;

		// Update position based on mouse movement
		const newPosition = {
			x: npvSettings.position.x + deltaX,
			y: npvSettings.position.y + deltaY,
		};

		// Calculate the new position considering the boundaries
		const maxX = window.innerWidth - element.offsetWidth;
		const maxY = window.innerHeight - element.offsetHeight;

		// Constrain the position within the screen bounds
		const constrainedPosition = {
			x: Math.max(0, Math.min(newPosition.x, maxX)),
			y: Math.max(0, Math.min(newPosition.y, maxY)),
		};

		// Update the state with the new position
		setCompactNpvPosition(constrainedPosition);

		// Apply the new position to the element's style
		element.style.left = `${constrainedPosition.x}px`;
		element.style.top = `${constrainedPosition.y}px`;

		// Update last mouse position for the next move
		lastMouseX = e.clientX;
		lastMouseY = e.clientY;
	};

	// Add event listener for mouse down
	element.addEventListener("mousedown", handleMouseDown);

	// Return the destroy function to clean up event listeners
	return () => {
		element.removeEventListener("mousedown", handleMouseDown);
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	};
};
