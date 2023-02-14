import { Spin } from 'antd';
import {FC} from 'react';

interface LoaderProps {
    containerStyle?: object;
    spinProps?:object;
}

const Loader: FC<LoaderProps> = ({containerStyle,spinProps}) => {
    return (
            <Spin {...spinProps} size="large" style={{position:'fixed',top:'50%',bottom:'50%',left:'50%',right:'50%'}}/>
    );
};

export default Loader;

