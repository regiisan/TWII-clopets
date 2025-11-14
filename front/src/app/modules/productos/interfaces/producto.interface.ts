export type Animal = 'perro' | 'gato';
export type Clasificacion = 'pañuelo' | 'sweater' | 'bota' | 'campera' | 'buzo' | 'collar' | 'remera';
export type Talle = 'S' | 'M' | 'L' | 'XL';

export interface ProductoTalle {
    talle: Talle;
    stock: number;
}

export interface Producto {
    id_producto: number;
    nombre: string;
    descripcion?: string;
    clasificacion: Clasificacion;
    animal: Animal;
    precio: number;
    imagen_principal?: string;
    imagen_secundaria?: string;
    producto_talle: ProductoTalle[];
}
