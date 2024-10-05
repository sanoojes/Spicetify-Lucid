import mountUnderMainViewWatcher from "@/hooks/mountUnderMainViewWatcher";
import { useUnderMainViewLoader } from "@/hooks/useUnderMainViewLoader";
import { logDebug } from "@/utils/logUtils";

const UnderMainViewManager = () => {
	logDebug("Render <UnderMainViewManager />");

	useUnderMainViewLoader();

	mountUnderMainViewWatcher();

	return null;
};

export default UnderMainViewManager;
