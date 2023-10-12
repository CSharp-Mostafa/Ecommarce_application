import { Requisition } from './requisition'; // Import associated Requisition model

export class Inspection {
  constructor(
    public inspectionId: number,
    public requistionId: number,
    public requisition: Requisition, // Reference to Requisition
    public inspectionDate: Date,
    public inspectionNote: string,
    public inspectionStatus: string // Use string for enum representation
  ) {}
}

