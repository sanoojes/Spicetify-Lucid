import { useBodyClass } from "@/hooks/useBodyClass";
import { useSettingsStore } from "@/store/useSettingsStore";

const NpvManager = () => {
	const {
		npvSettings: { mode, position, blur },
	} = useSettingsStore();

	document.body.style.setProperty("--compact-npv-blur", `${blur}px`);

	useBodyClass(`${mode}-npv`);

	useBodyClass(`${position}-npv`);

	return null;
};

export default NpvManager;
