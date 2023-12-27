"use client"

import {createContext, ReactNode, useState} from "react";

export const TabContext = createContext({
    tab: 'rec',
    setTab: (value: 'rec' | 'fol') => {},
});

type Props = {children: ReactNode}

export default function TabProvider ({children}) {
    const [tab, setTab] = useState('rec');

    return (
        <TabProvider.Provider value={{ tab, setTab }}>
            {children}
        </TabProvider.Provider>
    )
}
