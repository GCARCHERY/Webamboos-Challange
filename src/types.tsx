export type FieldData = {
    "Field Name": string,
    "Field Type": 'date' | 'string' | 'int',
    "Min-Max"?: {
        min: number | any,
        max: number | any
    }
}  