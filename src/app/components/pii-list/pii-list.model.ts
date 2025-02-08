export interface PeriodicElement {
  id: number;
  user_id: string;
  is_fraud: boolean;
  is_approved: boolean;
  action_type: string;
  count: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 0,
    user_id: '',
    is_fraud: false,
    is_approved: false,
    action_type: '',
    count: '',
  },
];

export const ReplaceUnderscorePipe = (value: string) => {
  return value ? value.replace(/_/g, ' ') : '';
};
