import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { useEditor } from '@craftjs/core';

export const Viewport = ({ children }) => {
    const { enabled, connectors } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));
    const [loaded, setLoaded] = useState(true);
    const [mouseEnabled, setMouseEnabled] = useState(false);



    return (
        <div
            className={cx(['viewport'], {
                loaded: loaded,
                'mouse-enabled': mouseEnabled,
            })}
        >
            <div
                className={cx([
                    'flex h-full overflow-hidden flex-row w-full',
                    {
                        'h-full': !enabled,
                        fixed: enabled,
                        relative: !enabled,
                    },
                ])}
            >
                <div className="flex-1 h-full">
                    <div className="w-full h-full">
                        <div
                            className={cx([
                                'craftjs-renderer h-full w-full transition pb-8',
                                {
                                    'overflow-auto': enabled
                                },
                            ])}
                            ref={(ref) =>
                                connectors.select(connectors.hover(ref, null), null)
                            }
                        >
                            <div
                                className={cx([
                                    'relative flex-col flex items-center',
                                    {
                                        'pt-8': enabled,
                                    },
                                ])}
                            >
                                {children}
                            </div>
                            <div
                                className={
                                    'flex items-center justify-center w-full pt-6 text-xs text-light-gray-2'
                                }
                            >
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
