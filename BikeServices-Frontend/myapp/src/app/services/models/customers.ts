/* tslint:disable */
/* eslint-disable */
import { Bookings } from '../models/bookings';
import { GrantedAuthority } from '../models/granted-authority';
export interface Customers {
  accountCreated?: string;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: Array<GrantedAuthority>;
  bookings?: Array<Bookings>;
  credentialsNonExpired?: boolean;
  email?: string;
  enabled?: boolean;
  id?: number;
  lastlogin?: string;
  name?: string;
  password?: string;
  phoneNumber?: string;
  role?: 'USERS' | 'OWNERS';
  username?: string;
}
