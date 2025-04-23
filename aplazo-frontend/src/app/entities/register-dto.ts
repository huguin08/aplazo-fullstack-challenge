/**
 * Qué es:
 *  Interfaz que describe los datos que envía el formulario de registro.
 *
 * Cómo funciona:
 *  - Todas las propiedades requeridas (`firstName`, `lastName`, `middleName`, `birthDate`) son de tipo string.
 *  - Las opcionales (`sex`, `birthPlace`, `curp`) llevan `?` y también son strings.
 *
 * Para qué sirve:
 *  Garantizar tipado fuerte al enviar la carga (payload) al backend.
 */
export interface RegisterDto {
    firstName:   string;
    lastName:    string;
    middleName:  string;
    birthDate:   string;
    sex?:        string;
    birthPlace?: string;
    curp?:       string;
}