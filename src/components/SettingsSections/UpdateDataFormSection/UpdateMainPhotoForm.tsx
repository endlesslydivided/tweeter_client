import { PlusOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Col, notification, Row } from 'antd'
import Upload, { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/redux';
import { useUpdateMainPhotoMutation } from '../../../services/UsersApiSlice';
import { updateCurrentUser } from '../../../store/slices/AuthSlice';

const UpdateMainPhotoForm = () => {

    const dispatch = useDispatch();
    const user:any = useAppSelector((state:any) => state.auth?.user);
    const [mainPhoto, setMainPhoto]:any = useState([]);

    const [updateMainPhoto] = useUpdateMainPhotoMutation();


    const avatar = user.mainPhoto ? process.env.REACT_APP_BACK_SERVER + user.mainPhoto?.path :  (mainPhoto[0] ?  URL.createObjectURL(mainPhoto[0])  : null)

    const handleChangeMainPhoto: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {

            const body = new FormData();

            body.append('mainPhoto', mainPhoto[0] , mainPhoto[0].name);
            const result:any = await updateMainPhoto({body});

            if(result.data)
            {
                dispatch(updateCurrentUser({...user,mainPhoto:{...result.data}}));
                notification.success({message:'Main photo is updated!',placement:'topRight',duration:2})
            }
            else if(result.error)
            {
                notification.error({message:result.error.message,placement:'topRight',duration:2})
            }
            
    };
    const mainPhotoProps: UploadProps = 
        {
            showUploadList:false,
            fileList:mainPhoto,
            accept:"image/*",
            listType:"picture-card",
            name: 'mainPhoto',
            maxCount: 1,
            itemRender:(originNode:any, file:any) => { return <></>},
            multiple:false,
            beforeUpload: (file:any,fileList:any) =>
            {
                if(fileList.length > 1)
                    setMainPhoto([fileList[0]]);
                else
                    setMainPhoto([file]);

                return false;
            },
            onChange:handleChangeMainPhoto
    };

    return (
        <>
            <Row gutter={[10,10]}  className="row" >
                <Col>
                    <Avatar size={120} shape="square" icon={<UserOutlined/>} src={avatar} />
                </Col>
                <Col>
                    <Avatar size={45} icon={<UserOutlined/>} src={avatar} />
                </Col>
                <Col>
                    <Avatar icon={<UserOutlined />} size={36} shape="square" src={avatar}  />
                </Col>
                <Col>
                    <Upload {...mainPhotoProps}>
                        <div>
                            <PlusOutlined />
                            <div className="text">Upload</div>
                        </div>
                    </Upload>
                </Col>
            </Row>
        </>
    )
}

export default UpdateMainPhotoForm