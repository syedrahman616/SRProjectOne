import React from 'react';

function SidebarHeader() {
    return (
        <div className="sidebar-header">
            <div className="logo_section">
                <a href="index.html"><img className="logo_icon img-responsive" src="images/logo/logo_icon.png" alt="#" /></a>
            </div>
        </div>
    );
}

function UserInfo() {
    return (
        <div className="sidebar_user_info">
            <div className="icon_setting"></div>
            <div className="user_profle_side">
                <div className="user_img"><img className="img-responsive" src="images/layout_img/user_img.jpg" alt="#" /></div>
                <div className="user_info">
                    <h6>John David</h6>
                    <p><span className="online_animation"></span> Online</p>
                </div>
            </div>
        </div>
    );
}

function GeneralLinks() {
    return (
        <div className="sidebar_blog_2">
            <h4>General</h4>
            <ul className="list-unstyled components">
                {/* List items for general links */}
            </ul>
        </div>
    );
}

function AdditionalPages() {
    return (
        <li className="active">
            <a href="#additional_page" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i className="fa fa-clone yellow_color"></i> <span>Additional Pages</span></a>
            <ul className="collapse list-unstyled" id="additional_page">
                {/* List items for additional pages */}
            </ul>
        </li>
    );
}

function OtherLinks() {
    return (
        <ul className="list-unstyled components">
            {/* Other links */}
        </ul>
    );
}

export { SidebarHeader, UserInfo, GeneralLinks, AdditionalPages, OtherLinks };
