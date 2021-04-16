export interface animalModel {
    id_animal: bigint;
    name: string;
    fecha: Date;
    cod_animal: number;
    breed: string;
    color: string;
    fk_estate: bigint;
}