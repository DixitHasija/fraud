export interface PeriodicElement {
  id: number;
  company_id: string;
  is_fraud: boolean;
  is_approved: boolean;
  fraud_type: string;
  count: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [];
