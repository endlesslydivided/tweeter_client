import { PlusOutlined } from '@ant-design/icons';
import { Col, notification, Row,Image } from 'antd';
import Upload, { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/redux';
import { useUpdateProfilePhotoMutation } from '../../../services/UsersApiSlice';
import { updateCurrentUser } from '../../../store/slices/AuthSlice';

const BgProfile = require('../../../assets/abstractBG/colorfulWaves.jpg');

const UpdateProfilePhotoForm = () => {

    const dispatch = useDispatch();
    const [profilePhoto, setProfilePhoto]:any = useState([]);
    const user:any = useAppSelector((state:any) => state.auth?.user);

    const [updateProfilePhoto] = useUpdateProfilePhotoMutation();

    const profileBG = user.profilePhoto ? 
    process.env.REACT_APP_BACK_SERVER + user.profilePhoto?.path :  
    (profilePhoto[0] ?  URL.createObjectURL(profilePhoto[0])  : BgProfile);

    const handleChangeProfilePhoto: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => 
    {
        const body = new FormData();

        body.append('profilePhoto', profilePhoto[0] , profilePhoto[0].name);
        const result:any = await updateProfilePhoto({body});

        if(result.data)
        {
            dispatch(updateCurrentUser({...user,profilePhoto:{...result.data}}));
            notification.success({message:'Profile photo is updated!',placement:'topRight',duration:2})
        }
        else if(result.error)
        {
            notification.error({message:result.error.message,placement:'topRight',duration:2})
        }      
    };

    const profileBGProps: UploadProps = 
    {
        showUploadList:false,
        fileList:profilePhoto,
        accept:"image/*",
        listType:"picture-card",
        name: 'profilePhoto',
        maxCount: 1,
        itemRender:(originNode:any, file:any) => { return <></>},
        multiple:false,
        beforeUpload: (file:any,fileList:any) =>
        {
            if(fileList.length > 1)
                setProfilePhoto([fileList[0]]);
            else
                setProfilePhoto([file]);

            return false;
        },
        onChange:handleChangeProfilePhoto
    };
   
    return (
        <>
            <Row>
                <Col className="profile-bg-col">
                    <Image  
                    src={profileBG}  
                    className="profile-bg-image"/>
                </Col>
                <Col>
                    <Upload {...profileBGProps} className="profile-bg-col-upload">
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

export default UpdateProfilePhotoForm;