import { InputHTMLAttributes } from "react";

export interface Input extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  type: string;
}
