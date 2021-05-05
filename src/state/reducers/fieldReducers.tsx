import { FieldData } from "../../types";

let INITIALSTATE:Array<FieldData> = []

const fields = (state = INITIALSTATE, action: any) => {
    switch (action.type) {
        case "UPDATE_FIELDS":
            return action.payload;
        default:
            return state;
    }
};
export default fields;