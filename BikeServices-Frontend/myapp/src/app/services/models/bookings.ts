/* tslint:disable */
/* eslint-disable */
export interface Bookings {
  bookedDate?: string;
  brand?: string;
  date?: string;
  id?: number;
  model?: string;
  serviceId?: number;
  status?: 'PENDING' | 'ACCEPTED' | 'NONDELIVERY' | 'DELIVERED' | 'REJECTED';
  vehicleNumber?: string;
  year?: number;
}
