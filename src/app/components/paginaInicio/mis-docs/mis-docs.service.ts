import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DoctorInfoService {
    private readonly doctorDpiKey = 'doctorDpi';

    setDoctorDpi(dpi: string) {
        localStorage.setItem(this.doctorDpiKey, dpi);
    }

    getDoctorDpi(): string | null {
        return localStorage.getItem(this.doctorDpiKey);
    }

    clearDoctorDpi() {
        localStorage.removeItem(this.doctorDpiKey);
    }
}