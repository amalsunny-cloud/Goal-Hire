export type CommunicationType = | "Email"
  | "Phone"
  | "LinkedIn"
  | "WhatsApp"
  | "Meeting"
  | "Other";


export interface RecruiterCommunication {
  _id: string;
  recruiterId: string;
  applicationId: string;
  type: CommunicationType;
  date: string;
  subject?: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
}
