import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { setPageTitle } from '../../store/uiSlice';
import { ROUTE_PATHS, PAGE_TITLES } from '../../configs/router-config';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer/Footer';
import styles from './Layout.module.css'; 

const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.ui.isGlobalLoading);

  useEffect(() => {
    if (location.pathname === ROUTE_PATHS.HOME) {
      dispatch(setPageTitle(PAGE_TITLES.HOME));
    } else if (location.pathname === ROUTE_PATHS.ADD_BLOG) {
      dispatch(setPageTitle(PAGE_TITLES.ADD_BLOG));
    } else if (location.pathname.includes('/edit-blog')) {
      dispatch(setPageTitle(PAGE_TITLES.EDIT_BLOG));
    }
  }, [location.pathname, dispatch]);

  return (
    <>
     {isLoading && (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;