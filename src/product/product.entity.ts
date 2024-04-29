import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "numeric", precision: 19, scale: 2 })
    price: number;

    @Column({ default: true })
    isActive: boolean;
}