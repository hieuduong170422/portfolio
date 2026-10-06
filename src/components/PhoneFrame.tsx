import Image from "next/image";
import type { AppScreen } from "@/lib/apps";
import { IPhoneDevice } from "./IPhoneDevice";

export function PhoneFrame({
  screen,
  priority = false,
}: {
  screen: AppScreen;
  priority?: boolean;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="w-[220px] sm:w-[240px]">
        <IPhoneDevice showIsland={!screen.hasDynamicIsland}>
          <Image
            src={screen.src}
            alt={screen.alt}
            fill
            sizes="(min-width: 640px) 240px, 220px"
            className="object-cover object-top"
            preload={priority}
          />
        </IPhoneDevice>
      </div>
      <p className="max-w-[240px] text-center text-sm text-secondary">
        {screen.caption}
      </p>
    </div>
  );
}
