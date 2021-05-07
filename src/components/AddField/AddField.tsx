import { useState } from "react";
import { Button, Input, Form, message, DatePicker, Select, InputNumber } from "antd";

import './AddFieldStyle.scss'

import fieldConfig from './fieldConfig.json'

import "antd/dist/antd.css";
import { FieldData } from "../../types";

interface Props {
    onSubmit?: Function 
}

export default function AddField(props: Props) {

    /////////////// -- DECLARE-STATES -- ///////////////////

    const [field_name, updateFieldName] = useState('')
    const [field_name_validated, updateFieldNameValidated] = useState(false)
    const [field_name_error, updateFieldNameError] = useState(false)
    const [data_type, updateDataType] = useState(fieldConfig.data_types[0].value as FieldData["Field Type"])
    const [min, updateMin] = useState(0)
    const [max, updateMax] = useState(100)

    console.log(field_name)

    /////////////// -- END-DECLARE-STATES -- ///////////////////

    /////////////// -- FORM-HANDLE -- ///////////////////

    const onFinish = (values: FieldData) => {
        let data = values
        data['Min-Max'] = {
            min: min,
            max: max
        }

        updateFieldName('')
        updateMin(0)
        updateMax(100)

        let Document:any = (document.getElementById("field-config-form"))
        if(Document) {
            Document.reset()
        }
        
        if(props.onSubmit) {
            props.onSubmit(data)
        }
    };

    const onFinishFailed = (errorInfo:any) => {
        errorInfo.errorFields.forEach((element:any) => {
            message.error(element.errors);
            if(element.name[0] === 'Field Name' && !field_name_error) {
                updateFieldNameError(true)
            }
        })
        
    };

    /////////////// -- END-FORM-HANDLE -- ///////////////////

    /////////////// -- DATA-TYPES -- ///////////////////

    const renderDataTypes: Function = () => {
        return fieldConfig.data_types.map((data_type, key) => {
            return <Select.Option value={data_type.value} key={key}>{data_type.name}</Select.Option>
        })
    }

    /////////////// -- END-DATA-TYPES -- ///////////////////

    /////////////// -- TEXT-INPUT-HANDLE -- ///////////////////

    const onTextInputChange = (event:any) => {
        updateFieldName(event.target.value)
        if(event.target.value && !field_name_validated) {
            updateFieldNameValidated(true)
            updateFieldNameError(false)
        }else if(!event.target.value) {
            updateFieldNameValidated(false)
            updateFieldNameError(true)
        }
    }

    /////////////// -- END-TEXT-INPUT-HANDLE -- ///////////////////

    /////////////// -- RANGE-PICKER-HANDLE -- ///////////////////

    const onRangePickerChange = (data:any) => {
        data.forEach((element:any, key: number) => {
            if(key) {
                updateMin(element)
            }else{
                updateMax(element)
            }
        }) 
    }

    /////////////// -- END-RANGE-PICKER-HANDLE -- ///////////////////

    /////////////// -- DECLARE-RENDER-CONFIG-SETTINGS -- ///////////////////

    const renderConfigSettings:Function = () => {
        if(data_type === 'date') {
            return  (
                        <DatePicker.RangePicker 
                            onChange={(data: any) => {onRangePickerChange(data)}}
                        /> 
                    )
        }else{
            return  (
                        <div>
                            <InputNumber
                                defaultValue={0}
                                value={min}
                                onChange={(event) => { if(event >= 0) updateMin(event) }}
                                parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') ? value.replace(/\$\s?|(,*)/g, '') : '0')}
                            />
                            <InputNumber
                                defaultValue={100}
                                value={max}
                                onChange={(event) => { if(event >= 0) updateMax(event) }}
                                parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') ? value.replace(/\$\s?|(,*)/g, '') : '100')}
                            />
                        </div>
                    )
        }
    }

    /////////////// -- DECLARE-RENDER-CONFIG-SETTINGS -- ///////////////

    ////////////////////////////////////////////////////////////////////

    return (
            <div className='add_field_wrapper'>
                <Form
                    id='field-config-form'
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    {/* /////////////// -- FORM-ITEM -- /////////////////// */}

                    <Form.Item 
                        validateStatus={field_name_validated ? 'success': field_name_error ? 'error' : ''} 
                        help={fieldConfig.default_texts.field_name.help}
                        name={fieldConfig.default_texts.field_name.name}
                        rules={[{required: true}]}
                    >
                        <Input 
                            placeholder={fieldConfig.default_texts.field_name.name}
                            onChange={(event) => {onTextInputChange(event)}}
                        />
                    </Form.Item>

                    {/* /////////////// -- END-FORM-ITEM -- /////////////////// */}

                    {/* /////////////////////////////////////////////////////// */}

                    {/* /////////////// -- FORM-ITEM -- /////////////////// */}

                    <Form.Item 
                        help={fieldConfig.default_texts.field_type.help}
                        name={fieldConfig.default_texts.field_type.name}
                        initialValue={data_type}
                    >
                        <Select 
                            style={{ width: '30%' }} 
                            defaultValue={data_type} 
                            onChange={(event) => {updateDataType(event)}}
                            value={data_type}
                        >
                            {renderDataTypes()}
                        </Select>
                    </Form.Item>

                    {/* /////////////// -- END-FORM-ITEM -- /////////////////// */}

                    {/* /////////////////////////////////////////////////////// */}

                    {/* /////////////// -- FORM-ITEM -- /////////////////// */}

                    <Form.Item 
                        help={fieldConfig.default_values[data_type].help}
                    >
                        {renderConfigSettings()}
                    </Form.Item>

                    {/* /////////////// -- END-FORM-ITEM -- /////////////////// */}

                    {/* /////////////////////////////////////////////////////// */}

                    {/* /////////////// -- SUBMIT-BUTTON -- /////////////////// */}

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add Field
                        </Button>
                    </Form.Item>

                    {/* /////////////// -- END-SUBMIT-BUTTON -- /////////////////// */}
                </Form>
            </div>
    );
}