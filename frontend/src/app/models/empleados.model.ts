export interface empleadoModel {
    id_employee: bigint;
    name: string;
    lastname: string;
    dni: number;
    typeofpayroll: string;
    phone: string;
    fecha: Date;
    fk_appointment: bigint;
}