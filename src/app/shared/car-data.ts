export class CarData {
    constructor(
        public id: string,
        public name: string,
        public drivingLicense: string,
        public carNo: string,
        public drivingPhoto: string,
        public companyId: string,
        public companyName: string,
        public dateOfBooking: Date,
        public dateOfReturn: Date,
        public status: string) {
    }
}
