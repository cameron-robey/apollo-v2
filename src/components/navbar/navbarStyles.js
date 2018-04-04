import styled from 'styled-components';

const Navbar = styled.nav`
    height: 50px;
    width: 100vw;
    background: #fff;
    border-bottom: 2px solid ${props => props.theme.colours.lightGrey};
    box-shadow: 0px -1px 6px rgba(73,73,73,0.30);
    padding: 0 5px;
	user-select: none;
`;

const Root = styled.ul`
    display: flex;
    align-items: center;
    height: 100%;
    list-style: none;
`;

const Logo = styled.li`
    margin: 0 10px;
    cursor: pointer;
    height: 40px;
    width: 40px;
    overflow: visible;
`;

const Item = styled.li`
    padding: 3px 10px;
    cursor: pointer;
    color: ${props => props.itemActive ? props.theme.colours.primary : props.theme.colours.darkGrey};
    font-weight: 600;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        left: 5%;
        height: 1em;
        width: 90%;
        border-bottom: 2.5px solid ${props => props.theme.colours.primary};
        margin-top: 10px;
        transform: ${props => props.itemActive ? 'scaleX(1)' : 'scaleX(0)'};
        transition: transform 150ms ease 60ms;
    }

    &:hover {
        color: ${props => props.theme.colours.primary};
    }

    &:hover:after {
        transform: scaleX(1);
    }
`;

const Grow = styled.li`
    flex: 1;
`;

const Notifications = styled.li`
    margin: 0 20px;
    cursor: pointer;
    height: 25px;
    width: 25px;
    overflow: visible;

    &:hover {
        fill: ${props => props.theme.colours.primary};

        path, circle:first-of-type, ellipse {
            stroke: ${props => props.theme.colours.primary};
        }
    }
`;

const NotificationDot = styled.circle`
    fill: ${props => props.active ? props.theme.colours.primary : 'none'};
    stroke: ${props => props.active ? '#fff' : 'none'};
    stroke-width: 1.5;
`;

const NotificationsWindow = styled.div`
    height: ${props => props.active ? 'auto' : '0px'};
    transition: height 3000ms ease;
    position: absolute;
    background: #fff;
    top: 60px;
    right: 15px;
    box-shadow: 0px 2px 7px rgba(73,73,73,0.25);
    cursor: auto;
`;

const UserName = styled.div`
    display: flex;
    height: 70%;
    align-items: center;
    color: ${props => props.theme.colours.darkGrey};
    font-weight: 600;
    border-left: 2px solid ${props => props.theme.colours.lightGrey};
    padding: 0 10px;
    cursor: pointer;

    &:hover {
        color: ${props => props.theme.colours.primary};

        path {
            stroke: ${props => props.theme.colours.primary};
        }
    }
`;

const InlineSVG = styled.svg`
    width: 15px;
    margin-left: 10px;
`;


export {Navbar, Item, Root, Logo, Grow, Notifications, NotificationDot, NotificationsWindow, UserName, InlineSVG};
