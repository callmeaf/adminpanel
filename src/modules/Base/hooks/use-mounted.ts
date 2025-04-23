import { useEffect, useState } from "react";

type TUseMounted = () => {
  mounted: boolean;
};

const useMounted: TUseMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    mounted,
  };
};

export default useMounted;
