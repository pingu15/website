import { redirect } from "next/navigation";
import { RESUME_PDF } from "@/lib/constants";

export default function ResumePage() {
  redirect(RESUME_PDF);
}
