/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {SidebarMenuItem} from './SidebarMenuItem'
import {useAuth} from "../../../../../app/modules/auth";
import {SidebarMenuItemWithSub} from "./SidebarMenuItemWithSub";

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
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Transations</span>
                </div>
            </div>
            {(hasRole("Director") || hasRole("Insurance")) && (
                <SidebarMenuItemWithSub fontIcon='bi-layers' icon='abstract-26' to='/insurances' title='Insurance'>
                    <SidebarMenuItem fontIcon='bi-layers' icon='abstract-19' to='/insurances/contracts'
                                     title='Insurance Contracts'/>
                </SidebarMenuItemWithSub>
            )}
            {(hasRole("Director") || hasRole("Sale")) && (
                <SidebarMenuItem fontIcon='bi-layers' icon='abstract-4' to='/test-drive' title='Test Drive'/>
            )}
            <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Management</span>
                </div>
            </div>


            {(hasRole("Director") || hasRole("Insurance")) && (
                <SidebarMenuItem fontIcon='bi-layers' icon='abstract-33' to='/insurances/providers'
                                 title='Insurance Providers'/>
            )}

            {(hasRole("Director")) && (
                <SidebarMenuItemWithSub fontIcon='bi-layers' icon='abstract-16' to='/cars' title='Car'>
                    <SidebarMenuItem fontIcon='bi-layers' icon='abstract-4' to='/cars' title='List Car'/>
                </SidebarMenuItemWithSub>
            )}


            {hasRole("Director") && (
                <SidebarMenuItem
                    to='/showrooms'
                    icon='map'
                    title='Showrooms'
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
                    to='/customers'
                    icon='abstract-14'
                    title='Customer'
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
