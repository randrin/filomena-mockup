export type TreatmentType = {
  id: string;
  name: string;
  duration: number;
  price?: number;
  category: string;
  status: "Active" | "Inactive";
  bodyPart: string;
  notes?: string;
};
