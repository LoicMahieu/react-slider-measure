import React from "react";
interface IMeasureProps {
    steps: number;
    value: number;
    onClick: (index: number) => void;
    activeColor?: string;
}
export declare const Measure: React.ForwardRefExoticComponent<IMeasureProps & React.RefAttributes<HTMLDivElement>>;
export {};
