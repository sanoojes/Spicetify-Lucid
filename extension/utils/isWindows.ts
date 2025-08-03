export function isWindows() {
  if (Spicetify?.Platform?.operatingSystem === "Windows") return true;

  if (Spicetify.Platform?.PlatformData?.os_name)
    return Spicetify.Platform.PlatformData.os_name
      .toLowerCase()
      .includes("win");

  return false;
}
