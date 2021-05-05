import { FieldData } from "../../types";

export const updateFields = (payload:Array<FieldData>) => {
    return {
        type: "UPDATE_FIELDS",
        payload
    };
};