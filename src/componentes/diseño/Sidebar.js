import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import linksAdministrador from "../navegacion/BarraLateralAdministrador";

const SidebarOption = ({
                           to,
                           label,
                           isActive,
                           icon: Icon,
                           isDropdown,
                           collapsed,
                           isOpen,
                           onClick,
                           items,
                           onClose,
                       }) => {
    const optionRef = useRef(null);

    return isDropdown ? (
        <li
            ref={optionRef}
            className={`relative flex items-center ${
                collapsed ? "justify-center" : "px-3"
            } py-1 rounded-lg transition-all duration-300 ${
                isActive ? "bg-blue-600 text-white" : "text-white"
            } hover:bg-blue-500`}
            onClick={() => {
                onClick();
            }}
            style={{ cursor: "pointer" }}
        >
            <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
                <Icon className="text-lg text-white" />
            </div>

            {!collapsed && (
                <div className="ml-3 flex-1 transition-all duration-300">
                    <span className="text-sm text-left whitespace-nowrap">{label}</span>
                </div>
            )}

            {!collapsed && isDropdown && (
                <div
                    className={`ml-auto transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                    }`}
                >
                    {isOpen ? (
                        <FaChevronUp className="text-white" />
                    ) : (
                        <FaChevronDown className="text-white" />
                    )}
                </div>
            )}

            {collapsed && isDropdown && (
                <div
                    className={`absolute left-full bg-blue-700 text-white rounded-lg shadow-lg w-48 z-50 transition-all duration-300 ${
                        isOpen
                            ? "opacity-100 pointer-events-auto translate-y-0"
                            : "opacity-0 pointer-events-none -translate-y-2"
                    }`}
                    style={{
                        top: optionRef.current ? optionRef.current.offsetTop : 0,
                        marginLeft: "8px",
                    }}
                >
                    <ul className="space-y-1 p-2">
                        {items?.map((item, index) => (
                            <SubOption
                                key={index}
                                item={item}
                                isActive={item.isActive}
                                onClose={onClose}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </li>
    ) : (
        <li
            className={`relative flex items-center ${
                collapsed ? "justify-center" : "px-3"
            } py-1 rounded-lg transition-all duration-300 ${
                isActive ? "bg-blue-600 font-semibold text-white" : "text-white"
            } hover:bg-blue-500`}
            onClick={() => {
                if (collapsed) onClose();
            }}
        >
            <Link
                to={to}
                className={`flex items-center ${
                    collapsed ? "justify-center" : "space-x-3"
                } w-full no-underline text-white`}
            >
                <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
                    <Icon className="text-lg text-white" />
                </div>
                {!collapsed && (
                    <div className="ml-3 flex-1 transition-all duration-300">
                        <span className="text-sm text-left whitespace-nowrap">{label}</span>
                    </div>
                )}
            </Link>
        </li>
    );
};

const SubOption = ({ item, onClose }) => {
    const { to, label, icon: Icon, isActive } = item;

    return (
        <li
            className={`rounded-md p-2 flex items-center transition-all duration-200 ${
                isActive ? "bg-blue-600" : "hover:bg-blue-500"
            }`}
            onClick={() => onClose()}
        >
            <Link
                to={to}
                className="flex items-center space-x-3 text-sm text-white no-underline w-full"
            >
                <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
                    <Icon className="text-lg text-white" />
                </div>
                <span
                    className={`flex-1 text-left transition-all duration-300 ${
                        isActive ? "font-semibold" : ""
                    }`}
                >
                    {label}
                </span>
            </Link>
        </li>
    );
};

const SidebarDropdown = ({
                             label,
                             icon: Icon,
                             items,
                             collapsed,
                             isActive,
                             isOpen,
                             onClick,
                             onClose,
                         }) => {
    return (
        <div className="relative">
            <SidebarOption
                label={label}
                icon={Icon}
                isDropdown
                isOpen={isOpen}
                onClick={onClick}
                isActive={isActive}
                collapsed={collapsed}
                items={items}
                onClose={onClose}
            />
            {!collapsed && (
                <ul
                    className={`pl-8 mt-1 space-y-1 overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen
                            ? "opacity-100 scale-y-100 max-h-screen"
                            : "opacity-0 scale-y-0 max-h-0"
                    }`}
                    style={{ transformOrigin: "top" }}
                >
                    {items.map((item, index) => (
                        <SubOption key={index} item={item} onClose={onClose} />
                    ))}
                </ul>
            )}
        </div>
    );
};

const Sidebar = ({ collapsed }) => {
    const location = useLocation();

    const [openDropdownExpanded, setOpenDropdownExpanded] = useState(null);
    const [openDropdownCollapsed, setOpenDropdownCollapsed] = useState(null);

    const handleDropdownClick = (index) => {
        if (collapsed) {
            setOpenDropdownCollapsed(
                openDropdownCollapsed === index ? null : index
            );
        } else {
            setOpenDropdownExpanded(
                openDropdownExpanded === index ? null : index
            );
        }
    };

    const handleCloseDropdown = () => {
        setOpenDropdownCollapsed(null);
        setOpenDropdownExpanded(null);
    };

    useEffect(() => {
        if (!collapsed) {
            setOpenDropdownCollapsed(null);
        }
    }, [collapsed]);

    const processedLinks = linksAdministrador.map((link) => {
        if (link.dropdown) {
            const childrenProcessed = link.children.map((child) => ({
                ...child,
                isActive: location.pathname === child.to,
            }));
            const anyChildActive = childrenProcessed.some((child) => child.isActive);
            return { ...link, children: childrenProcessed, isActive: anyChildActive };
        } else {
            return { ...link, isActive: link.to && location.pathname === link.to };
        }
    });

    return (
        <div
            className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-blue-700 text-white shadow-lg transition-all duration-300 ${
                collapsed ? "w-20" : "w-64"
            }`}
        >
            <ul className="space-y-1 pt-2 px-2">
                {processedLinks.map((link, index) =>
                    link.dropdown ? (
                        <SidebarDropdown
                            key={index}
                            label={link.label}
                            icon={link.icon}
                            items={link.children}
                            collapsed={collapsed}
                            isActive={link.isActive}
                            isOpen={
                                collapsed
                                    ? openDropdownCollapsed === index
                                    : openDropdownExpanded === index
                            }
                            onClick={() => handleDropdownClick(index)}
                            onClose={handleCloseDropdown}
                        />
                    ) : (
                        <SidebarOption
                            key={index}
                            to={link.to}
                            label={link.label}
                            icon={link.icon}
                            isActive={link.isActive}
                            collapsed={collapsed}
                            onClose={handleCloseDropdown}
                        />
                    )
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
