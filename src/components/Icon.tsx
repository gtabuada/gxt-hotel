import dynamic from "next/dynamic";
import { type LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export type IconName = keyof typeof dynamicIconImports;
interface IconProps extends LucideProps {
  name: IconName;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);

  return <LucideIcon {...props} />;
};
