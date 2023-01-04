import React, { FC, Dispatch, SetStateAction, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { useIntl } from 'react-intl'

import { icons } from '../../../lib/icons'

type NavigateBarProps = {
    setChangeEvent: Dispatch<SetStateAction<boolean>>
}

const NavigateBar: FC<NavigateBarProps> = ({ setChangeEvent }) => {
    const location = useLocation()

    const intl = useIntl()

    /**
     * 點擊互動區 tab 時為單純切換會場
     */
    const handleClick = () => {
        setChangeEvent(false)
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[location.pathname]} mode="horizontal">
            <Menu.Item key="/main">
                {icons.chat_icon()}
                <Link to="/main">{intl.formatMessage({ id: 'main.Chat' })}</Link>
            </Menu.Item>
            {/* <Menu.Item key="/main/qs">
                {icons.questions_icon()}
                <Link to="/main/qs">{intl.formatMessage({ id: 'main.Questions' })}</Link>
            </Menu.Item> */}
            {/* <Menu.Item key="/main/middle">
                {icons.Quiz_icon()}
                <Link to="/main/middle">{intl.formatMessage({ id: 'main.Quiz' })}</Link>
            </Menu.Item> */}
            <Menu.Item key="/main/post">
                {icons.survey_icon()}
                <Link to="/main/post">{intl.formatMessage({ id: 'main.Survey' })}</Link>
            </Menu.Item>
            <Menu.Item key="/main/score">
                {icons.temperature()}
                <Link to="/main/score">{intl.formatMessage({ id: 'main.Score' })}</Link>
            </Menu.Item>
            <Menu.Item key="/main/leaders">
                {icons.cap()}
                <Link to="/main/leaders">{intl.formatMessage({ id: 'main.LeaderBoard' })}</Link>
            </Menu.Item>
        </Menu>
    )
}

export default memo(NavigateBar)
