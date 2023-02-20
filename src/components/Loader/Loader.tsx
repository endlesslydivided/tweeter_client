import { Spin } from 'antd';
import {FC} from 'react';
import './Loader.scss'

interface LoaderProps {
    containerStyle?: object;
    spinProps?:object;
}

const Loader: FC<LoaderProps> = ({containerStyle,spinProps}) => {
    return (
            <Spin {...spinProps} size="large"/>
    );
};

export default Loader;

