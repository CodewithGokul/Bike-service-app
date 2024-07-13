/* tslint:disable */
/* eslint-disable */
export interface BookingResponse {
  bookId: number;
  bookedDate?: string;
  brand?: string;
  model?: string;
  serviceName?: string;
  status?: 'PENDING' | 'ACCEPTED' | 'NONDELIVERY' | 'DELIVERED' | 'REJECTED';
  vehicleNumber?: string;
}
