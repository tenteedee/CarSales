import {ID} from "../../../../_metronic/helpers";
import { Showroom } from '../../showroom/core/models';
import { RoleModel } from '../../auth';

export interface Profile {
    id?: number; // Optional
    fullname: string; // Required
    email: string; // Required
    phone_number?: string; // Optional
    address?: string; // Optional
}