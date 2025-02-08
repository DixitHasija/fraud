export interface PeriodicElement {
  id: number;
  company_id: string;
  is_fraud: boolean;
  is_approved: boolean;
  fraud_type: string;
  count: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 0,
    company_id: '',
    is_fraud: false,
    is_approved: false,
    fraud_type: '',
    count: '',
  },
];

export const ReplaceUnderscorePipe = (value: string) => {
  return value ? value.replace(/_/g, ' ') : '';
};
