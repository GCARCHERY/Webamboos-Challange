import { DatePicker, Input, InputNumber } from "antd";

import './FieldStyle.scss'

import "antd/dist/antd.css";
import { FieldData } from "../../types";

interface Props {
    field_name: FieldData["Field Name"],
    field_type: FieldData["Field Type"],
    min_max: FieldData["Min-Max"]
}

export default function Field(props: Props) {

    /////////////// -- DECLARE-CONDITIONS -- ///////////////////

    let MinCondition = props.min_max ? props.min_max.min : undefined
    let MaxCondition = props.min_max ? props.min_max.max : undefined

    /////////////// -- END-DECLARE-CONDITIONS -- ///////////////////

    /////////////// -- SELECTIVE-RENDERING-HANDLE -- ///////////////////

    const renderField:Function = () => {
        if(props.field_type === 'string') {
            return  (
                        <Input
                            type='text'
                            minLength={MinCondition}
                            maxLength={MaxCondition}
                            placeholder={'Field Value'}
                        />
                    )
        }else if(props.field_type === 'int') {
            return  (
                        <InputNumber
                            type='number'
                            min={MinCondition}
                            max={MaxCondition}
                        />
                    )
        }else{
            return  (
                        <DatePicker
                            disabledDate={d => !d || d.isAfter(new Date(MinCondition)) || d.isBefore(new Date(MaxCondition)) }
                        />
                    )
        }
    }

    /////////////// -- END-SELECTIVE-RENDERING-HANDLE -- ///////////////////

    return (
            <div className='wrapper'>
                {/* /////////////// -- Field Name -- /////////////////// */}
                <div className='field_name_wrapper'>
                    <h3>Field Name: {props.field_name}</h3>
                </div>
                {/* /////////////// -- Field Type -- /////////////////// */}
                <div className='field_name_wrapper'>
                    <h3>Field type: {props.field_type}</h3>
                </div>
                {/* /////////////// -- Field Render -- /////////////////// */}
                <div className='field_value_wrapper'>
                    {renderField()}
                </div>
                {/* /////////////// -- //////////// -- /////////////////// */}
            </div>
    );
}
