import { Spin } from 'antd';
import {FC} from 'react';

interface LoaderProps {
    containerStyle?: object;
    spinProps?:object;
}

const Loader: FC<LoaderProps> = ({containerStyle,spinProps}) => {
    return (
        <div style={{height: '95vh',...containerStyle}}>
            <Spin {...spinProps} />
        </div>
    );
};

export default Loader;

