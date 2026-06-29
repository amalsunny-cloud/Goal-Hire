export interface RecruiterCommunication {
  _id: string;
  recruiterId: string;
  applicationId: string;
  type: "Email" | "Phone" | "Linkedin" | "WhatsApp" | "Meeting" | "Other";
  date: string;
  subject?: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
}
