import { useBodyClass } from "@/hooks/useBodyClass";
import { useSettingsStore } from "@/store/useSettingsStore";

const NpvManager = () => {
  const {
    npvSettings: { mode },
  } = useSettingsStore();
  useBodyClass(`${mode}-npv`);

  return null;
};

export default NpvManager;
