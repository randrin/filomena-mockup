export type OperatorType = {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    preferred: boolean;
    unqualified: boolean;
    notes?: string;
    order?: number;
    status: "Active" | "Inactive";
  };