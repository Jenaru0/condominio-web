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
                       }) => {
    const optionRef = useRef(null);

    return (
        <li
            ref={optionRef}
            className={`relative flex items-center py-2 px-3 rounded-lg transition-all duration-300 ${
                isActive ? "bg-blue-600 font-semibold text-white" : "text-white"
            } hover:bg-blue-500`}
            onClick={isDropdown ? onClick : undefined}
            style={{ cursor: isDropdown ? "pointer" : "default" }}
        >
            {/* Contenedor de ícono y texto */}
            <div className="flex items-center w-full">
                <Icon className="text-lg text-white" />
                <div
                    className={`overflow-hidden transition-all duration-300 flex-1 ml-3 ${
                        collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                    }`}
                >
                    <span className="text-sm text-left whitespace-nowrap">{label}</span>
                </div>
            </div>

            {/* Flecha para desplegar subopciones */}
            {isDropdown && !collapsed && (
                <div className="ml-auto">
                    {isOpen ? (
                        <FaChevronUp className="text-white" />
                    ) : (
                        <FaChevronDown className="text-white" />
                    )}
                </div>
            )}

            {/* Subopciones flotantes cuando está colapsado */}
            {collapsed && isDropdown && (
                <div
                    className={`absolute left-full bg-blue-700 text-white rounded-lg shadow-lg w-48 z-50 transition-all duration-300 ${
                        isOpen ? "block" : "hidden"
                    }`}
                    style={{
                        top: optionRef.current ? optionRef.current.offsetTop : 0,
                        marginLeft: "8px",
                    }}
                >
                    <ul className="space-y-1 p-2">
                        {items?.map((item, index) => (
                            <li
                                key={index}
                                className="hover:bg-blue-600 rounded-md p-2 flex items-center transition-all duration-200"
                            >
                                <Link
                                    to={item.to}
                                    className="flex items-center space-x-3 text-sm text-white no-underline w-full"
                                >
                                    <item.icon className="text-lg text-white" />
                                    <span className="flex-1 text-left">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
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
            />
            {!collapsed && (
                <ul
                    className={`pl-8 mt-1 space-y-1 transition-all duration-300 ${
                        isOpen ? "block" : "hidden"
                    }`}
                >
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="hover:bg-blue-600 rounded-md p-2 flex items-center transition-all duration-200"
                        >
                            <Link
                                to={item.to}
                                className="flex items-center space-x-3 text-sm text-white no-underline w-full"
                            >
                                <item.icon className="text-lg text-white" />
                                <span className="flex-1 text-left">{item.label}</span>
                            </Link>
                        </li>
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

    useEffect(() => {
        if (collapsed) {
            setOpenDropdownExpanded(null);
        } else {
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
                        />
                    ) : (
                        <li key={index}>
                            <Link
                                to={link.to}
                                className={`flex items-center py-2 px-3 rounded-lg transition-all duration-300 ${
                                    link.isActive
                                        ? "bg-blue-600 font-semibold text-white"
                                        : "text-white"
                                } hover:bg-blue-500 no-underline`}
                            >
                                <link.icon className="text-lg text-white" />
                                <div
                                    className={`overflow-hidden transition-all duration-300 flex-1 ml-3 ${
                                        collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                                    }`}
                                >
                  <span className="text-sm text-left whitespace-nowrap">
                    {link.label}
                  </span>
                                </div>
                            </Link>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
