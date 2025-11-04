export type CategoryType = {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  notes?: string;
  createdAt: string;
  updatedAt?: string;
};
