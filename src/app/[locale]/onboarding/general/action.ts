"use server";

import api from "@/lib/api";
import { WizardFormGeneralInfo } from "@/validation/wizardForm";

export async function submitGeneralInfo(data: WizardFormGeneralInfo) {
  try {
    const res = await api.patch("/onboarding/general", data);

    return res.data;
  } catch (error) {}
}
