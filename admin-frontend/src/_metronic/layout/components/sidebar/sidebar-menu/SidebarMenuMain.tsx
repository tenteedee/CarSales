/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {SidebarMenuItem} from './SidebarMenuItem'
import {useAuth} from "../../../../../app/modules/auth";
import {Route} from "react-router-dom";
import SettingsPage from "../../../../../app/modules/settings/SettingsPage";

const SidebarMenuMain = () => {
    const intl = useIntl()
    const {hasRole} = useAuth()

    return (
        <>
            <SidebarMenuItem
                to='/dashboard'
                icon='element-11'
                title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
                fontIcon='bi-app-indicator'
            />

            <SidebarMenuItem to='/builder' icon='switch' title='Layout Builder' fontIcon='bi-layers'/>

            <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Management</span>
                </div>
            </div>
            { (hasRole("Director") || hasRole("Sale")) && (
                <SidebarMenuItem
                    to='/test-drive'
                    icon='ghost'
                    title='Test Drive'
                    fontIcon='bi-layers'
                />
            )}
            {hasRole("Director") && (
                <SidebarMenuItem
                    to='/news'
                    icon='menu'
                    title='News'
                    fontIcon='bi-layers'
                />
            )}
            {hasRole("Director") && (
                <SidebarMenuItem
                    to='/categories'
                    icon='menu'
                    title='News Category'
                    fontIcon='bi-layers'
                />
            )}
            {hasRole("Director") && (
                <SidebarMenuItem
                    to='/staffs'
                    icon='abstract-28'
                    title='Staff'
                    fontIcon='bi-layers'
                />
            )}
            {hasRole("Director") && (
                <SidebarMenuItem
                    to='/settings'
                    icon='wrench'
                    title='Settings'
                    fontIcon='bi-layers'
                />
            )}
        </>
    )
}

export {SidebarMenuMain}
