import { TreatmentType } from "../types/treatment.type";

export const treatments: TreatmentType[] = [
  {
    id: "TRATT001",
    name: "Deep Tissue Massage",
    duration: 60,
    price: 80,
    category: "MASSAGGI RILASSANTI",
    status: "Active", 
    bodyPart: "Total Body", 
    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: "TRATT002",
    name: "Aromatherapy Massage",
    duration: 45,
    price: 35,
    category: "MASSAGGI DI BELLEZZA",
    status: "Active",
    bodyPart: "Collo e Spalle",
    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
  },
  {
    id: "TRATT003",
    name: "Hot Stone Massage",
    duration: 75,
    price: 90,
    category: "MASSAGGI BENESSERE MIORILASSANTI",
    status: "Inactive",
    bodyPart: "Schiena",
    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: "TRATT004",
    name: "Thalaxoterm Treatment",
    duration: 50,
    price: 70,
    category: "THALAXOTERM - TRATTAMENTO CON VAPORE",
    status: "Inactive",
    bodyPart: "Gambe",
    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: "TRATT005",
    name: "Ultrasound Therapy",
    duration: 30,
    category: "TRATTAMENTI NUOVE TECNOLOGIE",
    status: "Active",
    bodyPart: "Braccia",
  },
  {
    id: "TRATT006",
    name: "Personalized Session",
    duration: 90,
    price: 120,
    category: "SEDUTE PERSONALI SU RICHIESTA",
    status: "Active",
    bodyPart: "Total Body",
  }
];
