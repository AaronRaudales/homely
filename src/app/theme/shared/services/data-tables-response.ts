import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataTablesResponse {
    data: {
        data: any[],
        currentPage: number,
        totalItems: number,
        totalPages: number
    };
    status: number;
    message:string;
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
}