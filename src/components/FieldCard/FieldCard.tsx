import { useState } from "react";
import { Button, Card, Modal } from "antd";
import { PlusOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { updateFields } from '../../state/actions/fieldActions'; 

import AddField from '../AddField/AddField';
import Field from '../Field/Field';

import './FieldCardStyle.scss';

import "antd/dist/antd.css";

import { FieldData } from "../../types";

export default function FieldCard() {

    /////////////// -- DECLARE-STATES -- ///////////////////

    const [isModalVisible, updateIsModalVisible] = useState(false)
    const reduxData:any = useSelector(state => state)
    const dispatch = useDispatch()

    /////////////// -- END-DECLARE-STATES -- ///////////////////

    /////////////// -- DECLARE-HANDLES -- ///////////////////

    const handleOk = () => {
        updateIsModalVisible(false)
    };
    
    const handleCancel = () => {
        updateIsModalVisible(false)
    };

    const onSubmit = (data: FieldData) => {
        let fields = reduxData.fields
        fields.push(data)
        dispatch(updateFields(fields))
        updateIsModalVisible(false)
    }

     /////////////// -- END-DECLARE-HANDLES -- ///////////////////

    /////////////// -- DISPLAY-ADDED-FIELDS -- ///////////////////

    const displayFields:Function = () => {
        if(reduxData.fields) {
            return reduxData.fields.map((element:FieldData, key:number) => {
                return <Field field_name={element['Field Name']} field_type={element['Field Type']} min_max={element['Min-Max']} key={key}/>
            })
        }
    }

    /////////////// -- END-DISPLAY-ADDED-FIELDS -- ///////////////////

    return (
            <Card 
                title={[
                    <Button 
                        type="dashed" 
                        onClick={() => updateIsModalVisible(true)} 
                        block icon={<PlusOutlined />}
                    >
                        Add field
                    </Button>
                ]}
            >
                <Modal 
                    okText='Add Field' 
                    title="Add a new Field" 
                    visible={isModalVisible} 
                    onOk={handleOk} 
                    onCancel={handleCancel}
                    footer={[]}
                >

                    {/* /////////////// -- ADD-FIELD-COMPONENT -- /////////////////// */}

                    <AddField onSubmit={onSubmit}/>

                    {/* /////////////// -- END-ADD-FIELD-COMPONENT -- /////////////////// */}

                </Modal>

                {/* /////////////// -- DISPLAY-ADDED-FIELDS -- /////////////////// */}

                {displayFields()}

                {/* /////////////// -- END-DISPLAY-ADDED-FIELDS -- /////////////////// */}

            </Card>
    );
}