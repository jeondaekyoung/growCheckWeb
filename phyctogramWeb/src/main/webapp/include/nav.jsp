<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<section class="c-transitions-loader js-loader" data-module="Loader" data-delay="0.8">
            <div class="c-transitions-loader_logo js-loader-logo" >                
                <img class="c-transitions-loader_logo_image" src="<%=application.getContextPath()%>/resources/res2/img/logo-loading.svg">
            </div>
            <div class="c-grid-loader">
                <div data-grid="gh-l1" class="js-loader-line c-grid-loader_line c-grid-loader_h -lh1" style="transform-origin: left center 0px; transform: matrix(1, 0, 0, 1, 0, 0);"></div>
                <div data-grid="gh-l2" class="js-loader-line c-grid-loader_line c-grid-loader_h -lh2" style="transform-origin: left center 0px; transform: matrix(1, 0, 0, 1, 0, 0);"></div>
                <div data-grid="gh-l3" class="js-loader-line c-grid-loader_line c-grid-loader_h -lh3" style="transform-origin: right center 0px; transform: matrix(1, 0, 0, 1, 0, 0);"></div>
                <div data-grid="gh-l4" class="js-loader-line c-grid-loader_line c-grid-loader_h -lh4" style="transform-origin: right center 0px; transform: matrix(1, 0, 0, 1, 0, 0);"></div>
                <div data-grid="gv-l1" class="js-loader-line c-grid-loader_line c-grid-loader_v -lv1" style="transform-origin: center top 0px; transform: matrix(1, 0, 0, 1, 0, -441);"></div>
                <div data-grid="gv-l2" class="js-loader-line c-grid-loader_line c-grid-loader_v -lv3" style="transform-origin: center top 0px; transform: matrix(1, 0, 0, 1, 0, -441);"></div>
                <div data-grid="gv-l3" class="js-loader-line c-grid-loader_line c-grid-loader_v -lv4 -red -top c-grid-loader_line_red_top" style="transform-origin: center bottom 0px; transform: matrix(1, 0, 0, 0, 0, 25);"></div>
                <div data-grid="gv-l4" class="js-loader-line c-grid-loader_line c-grid-loader_v -lv4 -red -bottom c-grid-loader_line_red_bottom" style="transform-origin: center top 0px; transform: matrix(1, 0, 0, 0, 0, 10);"></div>
                <div data-grid="gv-l5" class="js-loader-line c-grid-loader_line c-grid-loader_v -lv5" style="transform-origin: center bottom 0px; transform: matrix(1, 0, 0, 1, 0, -441);"></div>
                <div data-grid="gv-l6" class="js-loader-line c-grid-loader_line c-grid-loader_v -lv7" style="transform-origin: center bottom 0px; transform: matrix(1, 0, 0, 1, 0, -441);"></div>
                <div class="c-grid-loader_cols">
                    <div class="c-grid-loader_col"></div>
                    <div class="c-grid-loader_col"></div>
                    <div class="c-grid-loader_col"></div>
                    <div class="c-grid-loader_col"></div>
                    <div class="c-grid-loader_col"></div>
                </div>
            </div>
        </section>
        <div class="c-transitions-masks o-grid">
            <div class="c-transitions_mask o-grid_item -small"></div>
            <div class="c-transitions_mask o-grid_item -big"></div>
            <div class="c-transitions_mask o-grid_item -big"></div>
            <div class="c-transitions_mask o-grid_item -big"></div>
            <div class="c-transitions_mask o-grid_item -big"></div>
            <div class="c-transitions_mask o-grid_item -big"></div>
            <div class="c-transitions_mask o-grid_item -big"></div>
            <div class="c-transitions_mask o-grid_item -small"></div>
            <figure class="c-transitions-masks_logo">
                <img src="<%=application.getContextPath()%>/resources/res2/img/logo-loading.svg" class="c-header_logo_image" alt="그로우첵">
            </figure>
        </div>
        <div class="c-header_wrapper js-header-wrapper" data-module="HeaderCategories">
            <header class="c-header js-navigation">
                <div class="c-header_wrap">
                    <button class="c-header-burger js-header-burger" data-module="HeaderBurger" title="Menu" type="button">
                        <span class="c-header-burger_lines">
                            <span class="c-header-burger_line"></span>
                            <span class="c-header-burger_line"></span>
                            <span class="c-header-burger_line"></span>
                        </span>
                    </button>
                    <div class="c-header_logo">
                        <a class="c-header_logo_link " href="index.jsp">
                            <img src="<%=application.getContextPath()%>/resources/res2/img/logo.svg" class="c-header_logo_image" alt="그로우첵">
                        </a>
                    </div>
                    <nav class="c-header-navigation js-header-navigation" data-module="HeaderNavigation">
                        <div class="c-header-navigation_wrap">
                            <ul class="c-header-navigation_list">
                                    <li class="c-header-navigation_item js-dropdown">
                                        <a class="c-header-navigation_link js-dropdown-toggle " href="index.jsp">
                                            <span class="c-header-navigation_label">Home</span>
                                        </a>
                                        <div class="c-header-navigation-dropdown js-dropdown-content">
                                        </div>
                                    </li>
                                    <li class="c-header-navigation_item js-dropdown">
                                        <a class="c-header-navigation_link js-dropdown-toggle " href="hw.jsp">
                                            <span class="c-header-navigation_label">Hardware</span>
                                        </a>
                                        <div class="c-header-navigation-dropdown js-dropdown-content">
                                        </div>
                                    </li>
                                    <li class="c-header-navigation_item js-dropdown">
                                        <a class="c-header-navigation_link js-dropdown-toggle " href="app.jsp">
                                            <span class="c-header-navigation_label">App</span>
                                        </a>
                                        <div class="c-header-navigation-dropdown js-dropdown-content">
                                        </div>
                                    </li>
                                    <li class="c-header-navigation_item js-dropdown">
                                        <a class="c-header-navigation_link js-dropdown-toggle " href="about.jsp">
                                            <span class="c-header-navigation_label">About</span>
                                        </a>
                                        <div class="c-header-navigation-dropdown js-dropdown-content">
                                        </div>
                                    </li>
                                    <li class="c-header-navigation_item js-dropdown">
                                        <!-- <a class="c-header-navigation_link js-dropdown-toggle " href="faq.jsp"> -->
                                        <a class="c-header-navigation_link" href="javascript:alert('Page is under construction.')">
                                            <span class="c-header-navigation_label">FAQ</span>
                                        </a>
                                        <div class="c-header-navigation-dropdown js-dropdown-content">
                                        </div>
                                    </li>
                            </ul>
                            <ul class="c-header-mobile_list">
                                <li class="c-header-mobile_item -nav">
                                    <a class="c-header-mobile_link" href="contact.jsp">
                                        <span class="c-header-mobile_label">Contact Us</span>
                                    </a>
                                </li>
                                <li class="c-header-mobile_item -nav">
                                    <a class="c-header-mobile_link" href="terms.jsp">
                                        <span class="c-header-mobile_label">Terms and Conditions</span>
                                    </a>
                                </li>
                                <li class="c-header-mobile_item -nav">
                                    <a class="c-header-mobile_link" href="privacy.jsp">
                                        <span class="c-header-mobile_label">Privacy</span>
                                    </a>
                                </li>
                                <li class="c-header-mobile_item -nav">
                                    <a class="c-header-mobile_link" href="https://www.kickstarter.com/">
                                        <span class="c-header-mobile_label">Kickstarter</span>
                                    </a>
                                </li>
                            </ul>
            
                            <p class="c-header-mobile_copyright">© Grow Check, 2017</p>
                        </div>
                    </nav>
                </div>
            </header>
            
            <div class="c-header_overlay js-header-overlay"></div>
                
        </div>