export class CarData {
    constructor(
        public id: string,
        public name: string,
        public image: string,
        public address: string,
        public drivingLicense: string,
        public carNo: string,
        public drivingPhoto: string,
        public companyName: string,
        public dateOfBooking: Date,
        public dateOfReturn: Date) {
    }
}
