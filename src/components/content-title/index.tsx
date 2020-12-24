import React, { ReactNode } from 'react';
import { Weaper } from './index.style';

interface Prop {
    title: string;
    children?: ReactNode
}

const ContentTitle = (prop: Prop) => {
    return (
        <Weaper>
            <h1>{prop.title}</h1>
            <div>
                {prop.children}
            </div>
        </Weaper>
    )
}

export default ContentTitle;
