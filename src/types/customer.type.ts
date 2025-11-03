export type CustomerType = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    whatsApp: string;
    preference: "Email" | "Phone" | "WhatsApp";
    pathology: string;
    notes: string;
  };
  