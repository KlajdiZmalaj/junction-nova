import Button from "@/components/Button";
import { useGlobalContext } from "@/contexts/Global";
import { building } from "@/images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default () => {
  const router = useRouter();
  const { buildings } = useGlobalContext();

  const handleBuildClick = useCallback((buildId: any) => {
    router.push(`singleBuilding/${buildId}`);
  }, []);

  const firstBuilding = buildings[0]?.id || 0;
  const secondBuilding = buildings[1]?.id || 0;

  return (
    <div className="building">
      <div className="imgWrapper">
        <div className="buildOverlay one" onClick={() => handleBuildClick(firstBuilding)}>
          <div>{buildings[0]?.name}</div>
        </div>
        <div className="buildOverlay two" onClick={() => handleBuildClick(secondBuilding)}>
          <div>{buildings[1]?.name}</div>
        </div>

        <Image src={building} alt="" />
      </div>
      <div className="buildingInfos bg-neutral-800 flex justify-center flex-col">
        <div className="text-heading-l mb-5">What we offer </div>
        <p className="text-body-s">
          Decent, comfortable, safe accommodation with high standard services and facilities and a
          lively and attractive environment.
        </p>
        <p className="text-body-s">
          Apart Hotel offers accommodation with the most modern conditions for professionals,
          students, self-employed, corporations, business employees, etc.
        </p>
        <p className="text-body-s">
          The restaurant area has a capacity of 435 seats with a Self-Service area where students
          and all customers can have breakfast, lunch and dinner.
        </p>
        <div className="text-body-s mt-5">
          All buildings
          <div className="flex w-full mt-2 buttons">
            {buildings.map((button: any) => {
              return (
                <Button
                  key={button.id}
                  onClick={() => handleBuildClick(button.id)}
                  className="!mr-2"
                >
                  {button.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
