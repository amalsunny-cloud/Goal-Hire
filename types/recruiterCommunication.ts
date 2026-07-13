export type CommunicationType =
  | "Email"
  | "Phone"
  | "LinkedIn"
  | "WhatsApp"
  | "Meeting"
  | "Other";

export type ResponseType = "Positive" | "Neutral" | "Rejected" | "No Response";

export interface RecruiterCommunication {
  _id: string;
  recruiterId: string;
  applicationId: string;
  type: CommunicationType;
  date: string;
  subject?: string;
  message?: string;
  responded: boolean;
  responseDate?: string;
  responseType?: ResponseType;
  responseNotes?: string;
  createdAt: string;
  updatedAt: string;
}
