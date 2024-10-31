import { useBodyClass } from "@/hooks/useBodyClass";
import { useSettingsStore } from "@/store/useSettingsStore";

const NpvManager = () => {
  const {
    npvSettings: { mode, position },
  } = useSettingsStore();

  useBodyClass(`${mode}-npv`);

  useBodyClass(`${position}-npv`);

  return null;
};

export default NpvManager;
